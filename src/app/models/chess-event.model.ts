export interface Address {
  id?: number;
  street: string;
  zipCode: string;
  city: string;
  country: string;
}

export interface ChessEvent {
  id: number;
  label: string;
  date: string;
  type: string;
  description?: string;
  address: Address;
  organiser?: any; // peut être un ID ou un User selon les cas
}
