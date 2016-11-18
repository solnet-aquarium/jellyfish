
const DELAY = process.env.STEP_DELAY || 0;
const DELAY_BEFORE = DELAY;
const DELAY_AFTER = DELAY;

module.exports = function StepHooks() {

  this.BeforeStep(function (step, callback) {
    return setTimeout(callback, DELAY_BEFORE);
  });

  this.AfterStep(function (step, callback) {
    return setTimeout(callback, DELAY_AFTER);
  });

};
