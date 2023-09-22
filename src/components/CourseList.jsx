import React from 'react';

import { Card, CardBody, CardHeader, CardFooter, Divider, Skeleton } from '@nextui-org/react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import useStore from '../store';
import hasConflictWithSelected from '../utils/times';
import EditCourseModal from './EditCourseModal';

const Course = ({ course, onClick = () => { }, canAdd = false }) => {
    const selectedCourses = useStore(state => state.selectedCourses);
    const isSelected = selectedCourses.indexOf(course) !== -1 && canAdd;
    const conflict = hasConflictWithSelected(course, selectedCourses);
    return (
        <Card shadow className={`basis-1/4 h-48`}>
            <CardHeader className={`flex gap-3 ${isSelected ? 'bg-green-300' : ''} ${conflict ? 'bg-red-300' : ''}`}>
                <div className="flex flex-col justify-start items-start">
                    <p className="text-md text-left">{course.term} CS {course.number}</p>
                    <p className="text-small text-default-500 text-left">{course.title}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{course.meets}</p>
            </CardBody>
            <Divider />
            <CardFooter>
                {canAdd ? (
                    <Button color="primary" onClick={onClick}>
                        Add
                    </Button>
                ) : null}
                <EditCourseModal course={course} />
            </CardFooter>
        </Card>
    )
};

export const CourseList = ({ courses }) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    if (Object.keys(courses).length === 0) {
        return (
            <p className="text-center text-2xl">No courses found.</p>
        )
    }

    const term = useStore(state => state.term);
    const selectedCourses = useStore(state => state.selectedCourses);

    const addCourse = useStore(state => state.addCourse);
    const removeCourse = useStore(state => state.removeCourse);

    const filteredCourses = Object.values(courses).filter(course => course.term === term);
    
    const addCourseToSchedule = (course) => {
        // if course is already in schedule, remove it
        if (selectedCourses.indexOf(course) !== -1) {
            removeCourse(course);
            return;
        }

        if (hasConflictWithSelected(course, selectedCourses)) {
            onOpen();
            return;
        }
        addCourse(course);
    }

    return (
        <div className="grid md:grid-cols-4 gap-4 w-5/6 sm:grid-cols-1 m-4">
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Conflict Detected</ModalHeader>
                            <ModalBody>
                                <p>
                                    Unable to add course due to conflict with the current schedule.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {Object.values(filteredCourses).map(course =>
                <Course
                    course={course}
                    onClick={() => addCourseToSchedule(course)}
                    selectedCourses={selectedCourses}
                    canAdd={true}
                    key={`${course.term}-${course.number}`}
                />
            )}
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