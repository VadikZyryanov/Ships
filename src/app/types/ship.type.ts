export interface Ship {
  id: string;
  type: string;
  name: string;
  home_port: string;
}

export interface ShipData {
  ships: Ship[];
}

export interface ShipDetails extends Ship {
  weight_kg: string;
  year_built: string | null;
  missions: {
    name: string;
  }[];
}

export interface ShipDetailsData {
  ships: ShipDetails[];
}
