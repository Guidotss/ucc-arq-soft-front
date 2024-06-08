export type CreateCoursesDto = { 
    course_name: string; 
    description: string;
    price: number;
    duration: number;
    capacity: number;
    category_id: string;
    init_date: string;
    state: boolean;
    image: string;
}
