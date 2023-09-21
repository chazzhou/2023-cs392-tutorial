import { Card, CardBody, CardHeader } from '@nextui-org/react';

const Course = ({ course }) => (
    <Card shadow>
        <CardHeader>{course.number}: {course.title}</CardHeader>
        <CardBody>{course.meets}</CardBody>
    </Card>
);

const CourseList = ({ courses }) => (
    <div>
        {Object.values(courses).map(course => <Course course={course} />)}
    </div>
);

export default CourseList;