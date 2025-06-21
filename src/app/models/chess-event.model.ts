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
  maxParticipants: number;
  address: Address;
  organiser: number | { id: number; name?: string };
  participants?: { id: number; name?: string }[];
}
