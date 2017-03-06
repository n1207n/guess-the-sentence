// @flow

import _ from 'lodash';

/**
 * Return false if any of the object properties is undefined
 * @param  {Object} src - Target object to evaluate its properties
 * @param  {Array<String>} targetProperties - An optional string array of keys
 * @return {boolean}
 */
export function hasNoUndefinedFields(
  src: Object, targetProperties?: Array<String>) {
  if (targetProperties === undefined) {
    return Object
      .keys(src)
      .every((key) => _.has(src, key) && src[key] !== undefined);
  } else {
    return targetProperties.every((key) => _.has(src, key) && src[key] !== undefined);
  }
}
