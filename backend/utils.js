// @flow

/**
 * Return false if any of the object properties is undefined
 * @param  {Object} src - Target object to evaluate its properties
 * @param  {Array<String>} targetProperties - An optional string array of keys
 * @return {boolean}
 */
export function checkUndefinedFields(
  src: Object, targetProperties?: Array<String>) {

  if (targetProperties === undefined) {
    return Object
      .keys(src)
      .every((element) => src[element] !== undefined);
  } else {
    return targetProperties.every((element) => src[element] !== undefined);
  }
}
