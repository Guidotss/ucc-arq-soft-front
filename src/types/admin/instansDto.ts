export type ContainerInstanceDto = {
    Id: string;
    Names: string[];
    Image: string;
    ImageID: string;
    Command: string;
    Created: number;
    Ports: Array<{
      IP: string;
      PrivatePort: number;
      PublicPort: number;
      Type: string;
    }>;
    Labels: Record<string, string>;
    State: string;
    Status: string;
 }