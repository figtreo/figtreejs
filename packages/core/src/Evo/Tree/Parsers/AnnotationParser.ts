import type {
  Annotation,
  MarkovJumpValue,
  RawAnnotationValue,
  ValueOf,
} from "../Tree.types";
import { BaseAnnotationType } from "../Tree.types";

/** What the *parser* can emit before classification */

export type ClassifiedValue =
  | {
      type: BaseAnnotationType.DISCRETE;
      value: ValueOf<BaseAnnotationType.DISCRETE>;
    }
  | {
      type: BaseAnnotationType.NUMERICAL;
      value: ValueOf<BaseAnnotationType.NUMERICAL>;
    }
  | {
      type: BaseAnnotationType.BOOLEAN;
      value: ValueOf<BaseAnnotationType.BOOLEAN>;
    }
  | {
      type: BaseAnnotationType.NUMERICAL_SET;
      value: ValueOf<BaseAnnotationType.NUMERICAL_SET>;
    }
  | {
      type: BaseAnnotationType.DISCRETE_SET;
      value: ValueOf<BaseAnnotationType.DISCRETE_SET>;
    }
  | {
      type: BaseAnnotationType.MARKOV_JUMPS;
      value: ValueOf<BaseAnnotationType.MARKOV_JUMPS>;
    }
  | {
      type: BaseAnnotationType.DENSITIES;
      value: ValueOf<BaseAnnotationType.DENSITIES>;
    };

type ParsedAnnotationRaw = Record<string, RawAnnotationValue>;

// Parse the annotation found in a nexus (or newick string - perish the thought!)
export function parseAnnotation(annotationString: string): ParsedAnnotationRaw {
  const tokens = annotationString
    .split(/\s*('[^']+'|"[^"]+"|;|\(|\)|,|:|=|\[&|\]|\{|\})\s*/)
    .filter((token) => token.length > 0);
  let annotationKeyNext = true;
  let annotationKey: string = "";
  let isAnnotationARange = false;
  let inSubRange = false;
  let subValue: string[] = [];
  let value: RawAnnotationValue | undefined = undefined;
  const annotations: ParsedAnnotationRaw = {};

  // expect the first token to be a [& and last ]
  if (tokens[0] !== "[&" || tokens[tokens.length - 1] !== "]") {
    throw new Error(
      "expecting a [& at the start and ] at the end of the annotation",
    );
  }
  for (const token of tokens) {
    if (token === "[&") {
      // open BEAST annotation
      annotationKeyNext = true;
    } else if (token === "=") {
      annotationKeyNext = false;
    } else if (token === ",") {
      if (!isAnnotationARange) {
        annotationKeyNext = true;

        if (value === undefined) throw new Error(`Empty annotation value`);
        //finalize annotation
        annotations[annotationKey] = value;
      } else {
        continue; //to next value in range
      }
    } else if (token === "{") {
      if (isAnnotationARange) {
        inSubRange = true;
        subValue = [];
      } else {
        value = [];
      }
      isAnnotationARange = true;
    } else if (token === "}") {
      if (inSubRange) {
        inSubRange = false;
        // eslint-disable-next-line
        (value as any[])!.push(subValue);
      } else {
        isAnnotationARange = false;
      }
    } else if (token === "]") {
      // close BEAST annotation

      //finalize annotation
      if (value === undefined) throw new Error(`Empty annotation value`);
      annotations[annotationKey] = value;
    } else {
      // must be annotation
      // remove any quoting and then trim whitespace
      let annotationToken = token;
      if (annotationToken.startsWith('"') || annotationToken.startsWith("'")) {
        annotationToken = annotationToken.slice(1);
      }
      if (annotationToken.endsWith('"') || annotationToken.endsWith("'")) {
        annotationToken = annotationToken.slice(0, -1);
      }
      if (annotationKeyNext) {
        annotationKey = annotationToken.replace(".", "_");
      } else {
        if (isAnnotationARange) {
          if (inSubRange) {
            subValue.push(annotationToken);
          } else {
            // eslint-disable-next-line
            (value as any[]).push(annotationToken);
          }
        } else {
          if (isNaN(annotationToken as unknown as number)) {
            value = annotationToken;
          } else {
            value = parseFloat(annotationToken);
          }
        }
      }
    }
  }
  return annotations;
}

export function processAnnotationValue(
  values: RawAnnotationValue,
): ClassifiedValue {
  if (Array.isArray(values)) {
    // if is it an array it could be markov jump or array of values
    // is a set of  values
    //Array of array?
    if (Array.isArray(values[0])) {
      // an array of arrays is a markov jump
      // This may be a markov jump array
      const tuples = values as string[][];

      if (
        tuples
          .map((v) => v.length === 3)
          .reduce((acc, curr) => acc && curr, true)
      ) {
        const jumps: MarkovJumpValue[] = tuples.map(
          ([timeStr, source, dest]) => {
            const timeNum = Number(timeStr);
            if (!Number.isFinite(timeNum)) {
              throw new Error(
                `Expected a markov jump annotation but the first entry ${timeStr} could not be make a number`,
              );
            }
            return { time: timeNum, from: source, to: dest };
          },
        );
        return { type: BaseAnnotationType.MARKOV_JUMPS, value: jumps };
      } else {
        throw Error(
          `Markov jump with dimension ${tuples[0].length} detected. Expected 3. ${tuples.map((t) => t.length).join(",")}`,
        );
      }
    }
    // Flat array check types
    const flat = values as Array<string | number>;

    const allStrings = flat.every((v) => typeof v === "string");
    const allNumbersAfterCoerce = flat.every((v) => Number.isFinite(Number(v)));

    if (allNumbersAfterCoerce) {
      const nums = flat.map((v) => Number(v));
      return { type: BaseAnnotationType.NUMERICAL_SET, value: nums };
    }

    if (allStrings) {
      return {
        type: BaseAnnotationType.DISCRETE_SET,
        value: flat.slice(),
      };
    }

    // coerce to strings
    return {
      type: BaseAnnotationType.DISCRETE_SET,
      value: flat.map(String),
    };
    // densities
  } else if (isPlainObject(values)) {
    // is a set of properties with values

    const obj = values as Record<string, string | number | boolean>;
    const entries = Object.entries(obj);

    const allNumbers = entries.every(([, v]) => Number.isFinite(Number(v)));
    const allBooleans = entries.every(([, v]) => typeof v === "boolean");

    if (allNumbers) {
      const probs: Record<string, number> = {};
      for (const [k, v] of entries) {
        const n = Number(v);
        probs[k] = n;
      }
      return { type: BaseAnnotationType.DENSITIES, value: probs };
    }

    if (allBooleans) {
      const set = entries
        .filter(([, v]) => v === true)
        .map(([k]) => k)
        .sort();
      return { type: BaseAnnotationType.DISCRETE_SET, value: set };
    }

    throw new Error(
      "Unsupported object value: expected numeric (probabilities) or boolean map",
    );
  } else {
    if (typeof values === "boolean") {
      return { type: BaseAnnotationType.BOOLEAN, value: values };
    }

    if (typeof values === "number") {
      return { type: BaseAnnotationType.NUMERICAL, value: values };
    }

    if (typeof values === "string") {
      // try boolean literal
      const lower = values.toLowerCase();
      if (lower === "true" || lower === "false") {
        return { type: BaseAnnotationType.BOOLEAN, value: lower === "true" };
      }
      // try number
      const n = Number(values);
      if (Number.isFinite(n)) {
        return { type: BaseAnnotationType.NUMERICAL, value: n };
      }

      // otherwise discrete label
      return { type: BaseAnnotationType.DISCRETE, value: values };
    }
  }
  throw new Error(`Unsupported annotation value: ${String(values)}`);
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function writeAnnotationValue(a: Annotation): string {
  switch (a.type) {
    case BaseAnnotationType.DISCRETE:
      return a.value;
    case BaseAnnotationType.BOOLEAN:
      return String(a.value);
    case BaseAnnotationType.NUMERICAL:
      return String(a.value);
    case BaseAnnotationType.NUMERICAL_SET:
      return "{" + a.value.map((d) => String(d)).join(", ") + "}";
    case BaseAnnotationType.DISCRETE_SET:
      return "{" + a.value.join(", ") + "}";
    case BaseAnnotationType.MARKOV_JUMPS:
      return (
        "{" +
        a.value.map((d) => `{${String(d.time)},${d.from},${d.to}}`).join(", ") +
        "}"
      );
    case BaseAnnotationType.DENSITIES:
      throw new Error(
        `No defined why to write densities (${a.id}) as a string. \n Please convert keys and values to separate array annotations.`,
      );
  }
}
