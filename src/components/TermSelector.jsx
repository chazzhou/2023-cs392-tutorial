import React from "react";

import useStore from "../store";

import { Button, ButtonGroup } from "@nextui-org/react";

const TermSelector = () => {
    const terms = useStore(state => state.terms);
    const setTerm = useStore(state => state.setTerm);

    return (
        <ButtonGroup>
            {terms.map((term, index) => (
                <Button
                    key={index}
                    onClick={() => setTerm(term)}
                >
                    {term}
                </Button>
            ))}
        </ButtonGroup>
    );
}

export default TermSelector;