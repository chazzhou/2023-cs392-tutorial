import React from "react";

import useStore from "../store";

import { Button, ButtonGroup } from "@nextui-org/react";

const TermSelector = () => {
    const selected_term = useStore(state => state.term);
    const terms = useStore(state => state.terms);
    const setTerm = useStore(state => state.setTerm);

    return (
        <ButtonGroup>
            {terms.map((term, index) => (
                <Button
                    key={`term-${index}`}
                    onClick={() => setTerm(term)}
                    className={term === selected_term ? "bg-gradient-to-tr from-purple-500 to-yellow-500 text-white" : ""}
                    data-cy={term}
                >
                    {term}
                </Button>
            ))}
        </ButtonGroup>
    );
}

export default TermSelector;