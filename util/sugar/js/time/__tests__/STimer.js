"use strict";

module.exports = __STimer => {
  let doneComplete;
  let tickCount = 0;
  const timer = new __STimer(1000, {
    tickInterval: '100ms'
  });
  timer.onTick(() => {
    tickCount++;
  });
  timer.onComplete(() => {
    doneComplete();
  });
  timer.start();
  it('The timer remaining time has to be around 500', done => {
    setTimeout(() => {
      expect(timer.remaining).toBeLessThan(600);
      expect(timer.remaining).toBeGreaterThan(400);
      done();
    }, 500);
  });
  it('The timer has to tick 10 times', done => {
    doneComplete = done;
    setTimeout(() => {
      expect(tickCount).toBe(10);
    }, 600);
  });
};