/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Font } from '../../common/text_utils';
import type { TextMeasure } from '../../utils/bbox/canvas_text_bbox_calculator';

/** @internal */
export const MIN_RESERVED_CURRENT_AND_LAST_VALUE_WIDTH_PX = 24;

/**
 * Compute the pixel width reserved for a `CurrentAndLastValue` legend cell.
 *
 * The width is the sum of the optional title prefix (e.g. `"VALUE: "`) and the value label,
 * with the value portion clamped to `MIN_RESERVED_CURRENT_AND_LAST_VALUE_WIDTH_PX` when a
 * `maxFormattedValue` is being reserved across rows. The clamp is intentionally applied to
 * the value only so that the title prefix is never trimmed.
 *
 * @internal
 */
export function computeCurrentAndLastValueReservedWidth({
  textMeasure,
  prefix,
  valueLabel,
  font,
  fontSize,
  lineHeight,
}: {
  textMeasure: TextMeasure;
  prefix: string;
  valueLabel: string;
  font: Omit<Font, 'textColor'>;
  fontSize: number;
  lineHeight: number;
}): number {
  const prefixWidth = prefix ? textMeasure(prefix, font, fontSize, lineHeight).width : 0;
  const valueWidth = textMeasure(valueLabel, font, fontSize, lineHeight).width;
  const clampedValueWidth = Math.max(valueWidth, MIN_RESERVED_CURRENT_AND_LAST_VALUE_WIDTH_PX);
  return prefixWidth + clampedValueWidth;
}
