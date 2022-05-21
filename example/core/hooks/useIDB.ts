import { TypedUseIDBHook, useIDB as defaultUseIDB } from '../../../.';
import { ModelNames } from '../db/models';

const useIDB: TypedUseIDBHook<ModelNames> = defaultUseIDB;
export default useIDB;
