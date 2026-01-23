export class Car {
  id: string;
  license_plate: string;
  available: boolean;

  constructor(id: string, license_plate: string, available: boolean = true) {
    this.id = id;
    this.license_plate = license_plate;
    this.available = available;
  }
}
