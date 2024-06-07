export type CreateCoursesDto = { 
    cousename: string; 
    description: string;
    price: number;
    duration: number;
    capacity: number;
    categoryId: string;
    initDate: Date;
    state: boolean;
    image: string;
}
