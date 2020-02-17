import { getDayOfYear } from 'date-fns';

class Withdrawl {
  constructor() {
    this.currentDay = getDayOfYear(new Date());
    this.withdrawls = 0;
  }

  checkDate(date) {
    const withdrawlDay = getDayOfYear(date);
    if (this.currentDay < withdrawlDay) {
      this.currentDay = withdrawlDay;
      this.withdrawls = 0;
    }
  }

  withdrawls() {
    return this.withdrawls;
  }

  currentDay() {
    return this.currentDay;
  }
}

export default new Withdrawl();
