export interface PetData {
  id: string;
  name: string;
  ownerID: string;
  route: LocationData[];
  missing: boolean;
  type: string; //cat | dog für Icon
}

export interface LocationData {
  timeStamp: number;
  lampID: string;
}


