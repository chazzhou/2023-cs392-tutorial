import React from "react";

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";
import hasConflictWithSelected from "../utils/times";
import useStore from "../store";

const EditCourseModal = ({ course }) => {
    const selectedCourses = useStore(state => state.selectedCourses);
    const terms = useStore(state => state.terms);
    const updateExisitingCourse = useStore(state => state.updateExisitingCourse);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [newCourse, setNewCourse] = React.useState(course);

    const onClose = () => {
        // reset the state of newCourse
        setNewCourse(course);
        onOpenChange();
    }

    const onSave = () => {
        // ignore if same, deep equal
        if (JSON.stringify(course) !== JSON.stringify(newCourse)) {
            updateExisitingCourse(course, newCourse);
        }
        onOpenChange();
    }

    const isTermValid = (term) => {
        return terms.indexOf(term) !== -1;
    }

    const isTitleValid = (title) => {
        // at least 2 characters
        return title.length >= 2;
    }

    const isNumberValid = (number) => {
        // at least 3 characters
        return number.length >= 3;
    }

    const isMeetsValid = (meets) => {
        // should follow "MWF 12:00-13:20" format
        // First are the days of the week, followed by a space, followed by the start time, a dash, and the end time.
        // The start time and end time should be in 24-hour format.
        // The start time should be earlier than the end time.
        // The days of the week should be one or more of M, T, W, Th, F, Sa, Su.
        // The start and end times should be valid times.
        const days = meets.split(" ")[0];
        const times = meets.split(" ")[1];
        const startTime = times.split("-")[0];
        const endTime = times.split("-")[1];

        const checkConflict = hasConflictWithSelected(newCourse, selectedCourses);

        const daysValid = days.match(/^(M|Tu|W|Th|F|Sa|Su)+$/g);
        const timesValid = startTime.match(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/g) && endTime.match(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/g);
        const startBeforeEnd = startTime < endTime;

        return daysValid && timesValid && startBeforeEnd && !checkConflict;
    }

    const allValid = () => {
        return isTermValid(newCourse.term) && isTitleValid(newCourse.title) && isNumberValid(newCourse.number) && isMeetsValid(newCourse.meets);
    }

    return (
        <>
            <Button onPress={onOpen} className="m-2">Edit</Button>
            <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="md"
            scrollBehavior="inside"
            >
                <ModalContent>
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
                                isInvalid={!isTitleValid(newCourse.title)}
                                errorMessage={!isTitleValid(newCourse.title) ? "Please enter a valid title." : ""}
                                />
                            <Select
                                label="Term"
                                selectedKeys={[newCourse.term]}
                                onSelectionChange={value => setNewCourse({...newCourse, term: [...value][0]})}
                                variant="bordered"
                                isInvalid={!isTermValid(newCourse.term)}
                                errorMessage={!isTermValid(newCourse.term) ? "Please select a term." : ""}
                                isRequired
                                >
                                {terms.map((term, index) => (
                                    <SelectItem key={term} value={term}>
                                        {term}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Input
                                label="Number"
                                value={newCourse.number}
                                onValueChange={value => setNewCourse({...newCourse, number: value})}
                                variant="bordered"
                                isRequired
                                isInvalid={!isNumberValid(newCourse.number)}
                                errorMessage={!isNumberValid(newCourse.number) ? "Please enter a valid number." : ""}
                                />
                            <Input
                                label="Meets"
                                value={newCourse.meets}
                                onValueChange={value => setNewCourse({...newCourse, meets: value})}
                                variant="bordered"
                                isRequired
                                isInvalid={!isMeetsValid(newCourse.meets)}
                                errorMessage={!isMeetsValid(newCourse.meets) ? "Please enter a valid meeting time." : ""}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onClose} color="danger" variant="flat">
                                    Close
                                </Button>
                                <Button onClick={onSave} color="primary" disabled={!allValid()} isDisabled={!allValid()}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                </ModalContent>
            </Modal>
        </>
    );
}

export default EditCourseModal;
