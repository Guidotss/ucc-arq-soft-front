export type CreateCoursesDto = { 
    couseName: string; 
    description: string;
    price: number;
    duration: number;
    capacity: number;
    categoryId: string;
    initDate: Date;
    state: boolean;
    image: string;
}
