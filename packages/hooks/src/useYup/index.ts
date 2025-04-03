import { addMethod, number, NumberSchema, string, StringSchema } from 'yup';

import validators from './validators';

Object.entries(validators).forEach(([key, val]) => {
    addMethod(string, key, val);
});

export interface IString extends StringSchema {
    ipv4: (msg?: string) => any;
}

export type { NumberSchema };

function useYup() {
    const updString: () => IString = string as any;

    return { string: updString, number };
}

export default useYup;
