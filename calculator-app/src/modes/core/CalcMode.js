export class CalcMode {
  get id() {
    throw new Error(`[CalcMode] "${this.constructor.name}" must implement "id" getter`);
  }

  get label() {
    throw new Error(`[CalcMode] "${this.constructor.name}" must implement "label" getter`);
  }

  get inputs() {
    return [];
  }

  get outputs() {
    return [];
  }

  /**
   * @param {Record<string, any>} inputs - raw form values keyed by input.key
   * @returns {{ valid: boolean, errors: Record<string, string>, parsed: Record<string, any> }}
   */
  // eslint-disable-next-line no-unused-vars
  validate(inputs) {
    throw new Error(`[CalcMode] "${this.constructor.name}" must implement "validate" method`);
  }

  /**
   * @param {Record<string, any>} inputs - validated & parsed values
   * @returns {Record<string, any>} results keyed by output.key
   */
  // eslint-disable-next-line no-unused-vars
  execute(inputs) {
    throw new Error(`[CalcMode] "${this.constructor.name}" must implement "execute" method`);
  }
}
