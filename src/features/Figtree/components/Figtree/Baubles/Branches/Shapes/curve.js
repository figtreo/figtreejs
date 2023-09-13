/*
Copyright 2010-2022 Mike Bostock

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.
*/

import { polarToCartesian } from "../../../Layouts/polarLayout";
import { link } from "d3-shape";
//adjusted to allow for smooth curves and straight lines in rectangular layout.

class BumpRectangular {
  constructor(context, c) {
    this._context = context;
    this._c = c;
    this._point = 0;
    this._line = 0;

  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  }

  // x and y are the end and x0 and y0 the start
  point(x, y) {
    // let _x = +x, _y = +y;
    if (this._point === 0) {
      this._point = 1;
    } else {

      console.log(this._c);
      if (this._c === 0) { // no curve
        console.log("no curve")
        var x1 = this._x0 + 0.001;// tiny adjustment for faded line (can't have y or x dimension not change at all
        this._context.moveTo(x1, this._y0);
        this._context.lineTo(x1, y); //draws a straight line vertically
        this._context.lineTo(x, y + 0.001); // draws a straight line horizontally
      } else if (this._c < 1) {
        // curve
        this._context.moveTo(this._x0, this._y0);
        this._context.bezierCurveTo(this._x0, y, this._x0 + Math.abs(this._c * (this._x0 - x)), y, x, y);

      } else if (this._c == 1) {
        this._context.moveTo(this._x0, this._y0); // go to start
        this._context.lineTo(x, y);// straight line to end
      }
    }

    this._x0 = x;
    this._y0 = y;
  }
}

export const bumpRectangular = (c) => (context) => new BumpRectangular(context, c);


class BumpRadial {
  constructor(context,center=[0,0]) {
    this._context = context;
    this._center = center;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() { }
  point(x, y) {
    // x = +x, y = +y;
    if (this._point === 0) {
      this._point = 1;
    } else {



      const p0 = polarToCartesian(this._y0,this._x0, );
      const p1 = polarToCartesian( y,x);

      this._context.moveTo(...p0);
      this._context.arc(...this._center, this._y0, this._x0, x,(x > this._x0 ? 1 : 0))
      this._context.lineTo(...p1)


    }
    this._x0 = x;
    this._y0 = y;
  }
}
export function bumpRadial(context) {
  return new BumpRadial(context);
}
// after the d3 linkRadial.
export function linkPolar() {
  const l = link(bumpRadial);
  l.angel = l.x;
  delete l.x;
  l.radius = l.y;
  delete l.y;
  return l;
}

