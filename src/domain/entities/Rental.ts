export class Rental {
  id: string;
  userId: string;
  carId: string;
  startDate: Date;
  expectedReturnDate: Date;
  endDate?: Date;

  constructor(
    id: string,
    userId: string,
    carId: string,
    expectedReturnDate: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.carId = carId;
    this.startDate = new Date();
    this.expectedReturnDate = expectedReturnDate;
  }
}
