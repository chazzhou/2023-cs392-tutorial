import React from 'react';

import { Card, CardBody, CardHeader, Divider, Skeleton } from '@nextui-org/react';
import useStore from '../store';

const Course = ({ course, onClick = () => { }, isPressable = false }) => {
    const selectedCourses = useStore(state => state.selectedCourses);
    const isSelected = selectedCourses.indexOf(course) !== -1 && isPressable;
    return (
        <Card shadow isPressable={isPressable} className={`basis-1/4 h-48 ${isSelected ? '' : 'hover:bg-gray-300'}`} onClick={onClick}>
            <CardHeader className={`}flex gap-3 ${isSelected ? 'bg-green-300' : ''}`}>
                <div className="flex flex-col justify-start items-start">
                    <p className="text-md text-left">{course.term} CS {course.number}</p>
                    <p className="text-small text-default-500 text-left">{course.title}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{course.meets}</p>
            </CardBody>
        </Card>
    )
};

export const CourseList = ({ courses }) => {
    if (Object.keys(courses).length === 0) {
        return (
            <p className="text-center text-2xl">No courses found.</p>
        )
    }

    const term = useStore(state => state.term);
    const selectedCourses = useStore(state => state.selectedCourses);

    const setCourses = useStore(state => state.setCourses);

    const filteredCourses = Object.values(courses).filter(course => course.term === term);

    return (
        <div className="grid md:grid-cols-4 gap-4 w-5/6 sm:grid-cols-1 m-4">
            {Object.values(filteredCourses).map(course => <Course
                course={course}
                onClick={() => setCourses(course)}
                selectedCourses={selectedCourses}
                key={course.number}
                isPressable={true}
            />)}
        </div>
    )
};

export const UnclickableSingleCourseList = ({ courses }) => {
    if (Object.keys(courses).length === 0) {
        return (
            <p className="text-center text-2xl">No courses found.</p>
        )
    }

    const term = useStore(state => state.term);
    const selectedCourses = useStore(state => state.selectedCourses);

    const filteredCourses = Object.values(courses).filter(course => course.term === term);

    return (
        <div className="grid md:grid-cols-2 gap-4 sm:grid-cols-1">
            {Object.values(filteredCourses).map(course => <Course course={course} selectedCourses={selectedCourses} key={course.number} />)}
        </div>
    )
}

const SkeletonCourse = () => (
    <Card shadow className="basis-1/4 h-48">
        <Skeleton className="rounded-lg">
            <div className="h-48 rounded-lg bg-default-300"></div>
        </Skeleton>
    </Card>
);

export const SkeletonCourseList = () => (
    <div className="grid md:grid-cols-4 gap-4 w-5/6 sm:grid-cols-1 m-4">
        <SkeletonCourse />
        <SkeletonCourse />
        <SkeletonCourse />
        <SkeletonCourse />
    </div>
);

export default CourseList;