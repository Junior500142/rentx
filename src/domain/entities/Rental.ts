export class Rental {
  id: string;
  car_id: string;
  user_id: string;
  start_date: Date;
  expected_return_date: Date;
  end_date?: Date | null;

  constructor(
    id: string,
    car_id: string,
    user_id: string,
    expected_return_date: Date,
    start_date: Date = new Date(),
    end_date: Date | null = null
  ) {
    this.id = id;
    this.car_id = car_id;
    this.user_id = user_id;
    this.expected_return_date = expected_return_date;
    this.start_date = start_date;
    this.end_date = end_date;
  }
}