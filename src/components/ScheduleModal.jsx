import React from "react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

import useStore from "../store";
import {UnclickableSingleCourseList} from "./CourseList";

const ScheduleModal = () => {
    const selectedCourses = useStore(state => state.selectedCourses);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} className="bg-gradient-to-tr from-purple-500 to-yellow-500 text-white shadow-lg">Current Schedule</Button>
            <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="5xl"
            scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Current Schedule</ModalHeader>
                            <ModalBody>
                                <UnclickableSingleCourseList courses={selectedCourses} />
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onClose} color="primary">
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ScheduleModal;
