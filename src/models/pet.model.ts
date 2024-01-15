export interface pet {
    category: {
    id: string;
    name: string;
  };
  id: string;
  name: string;
  photoUrls: [string];
  status: petStatus;
  tags: [{ id: string; name: string }];
}

export enum petStatus {
    Available = 'available',
    Pending = 'pending',
    Sold = 'sold'
}