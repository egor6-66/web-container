import { addMethod, string, StringSchema } from 'yup';

import validators from './validators';

Object.entries(validators).forEach(([key, val]) => {
    addMethod(string, key, val);
});

export interface IString extends StringSchema {
    ipv4: (msg?: string) => any;
}

function useYap() {
    const updString: () => IString = string as any;

    return { string: updString };
}

export default useYap;
