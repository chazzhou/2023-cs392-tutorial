import React from "react";

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import useStore from "../store";

const EditCourseModal = ({ course }) => {
    const selectedCourses = useStore(state => state.selectedCourses);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [newCourse, setNewCourse] = React.useState(course);

    return (
        <>
            <Button onPress={onOpen} className="m-2">Edit</Button>
            <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="5xl"
            scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit Course</ModalHeader>
                            <ModalBody>
                            <Input
                                autoFocus
                                label="Title"
                                value={newCourse.title}
                                onValueChange={value => setNewCourse({...newCourse, title: value})}
                                variant="bordered"
                                isRequired
                                />
                            <Input
                                label="Term"
                                value={newCourse.term}
                                onValueChange={value => setNewCourse({...newCourse, term: value})}
                                variant="bordered"
                                isRequired
                                />
                            <Input
                                label="Number"
                                value={newCourse.number}
                                onValueChange={value => setNewCourse({...newCourse, number: value})}
                                variant="bordered"
                                isRequired
                                />
                            <Input
                                label="Meets"
                                value={newCourse.meets}
                                onValueChange={value => setNewCourse({...newCourse, meets: value})}
                                variant="bordered"
                                isRequired
                                />
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

export default EditCourseModal;
