import { Card, CardBody, CardHeader, Divider, Skeleton } from '@nextui-org/react';

const Course = ({ course }) => (
    <Card shadow className="basis-1/4 h-48">
        <CardHeader className="flex gap-3">
            <div className="flex flex-col">
                <p className="text-md">{course.term} CS {course.number}</p>
                <p className="text-small text-default-500">{course.title}</p>
            </div>
        </CardHeader>
        <Divider />
        <CardBody>
            <p>{course.meets}</p>
        </CardBody>
    </Card>
);

export const CourseList = ({ courses }) => (
    <div class="grid md:grid-cols-4 gap-4 w-5/6 sm:grid-cols-1 m-4">
        {Object.values(courses).map(course => <Course course={course} />)}
    </div>
);

const SkeletonCourse = () => (
    <Card shadow className="basis-1/4 h-48">
        <Skeleton className="rounded-lg">
            <div className="h-48 rounded-lg bg-default-300"></div>
        </Skeleton>
    </Card>
);

export const SkeletonCourseList = () => (
    <div class="grid md:grid-cols-4 gap-4 w-5/6 sm:grid-cols-1 m-4">
        <SkeletonCourse />
        <SkeletonCourse />
        <SkeletonCourse />
        <SkeletonCourse />
    </div>
);

export default CourseList;