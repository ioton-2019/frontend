export interface PetData {
  _id: string;
  name: string;
  ownerID: string;
  lastSeen: LocationData[];
  isMissing: boolean;
  type: string; //cat | dog für Icon
}

export interface LocationData {
  timestamp: string;
  lampID: string;
}


