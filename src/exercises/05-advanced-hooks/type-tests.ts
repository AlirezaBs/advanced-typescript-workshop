/** Expected return type once useToggle is implemented with useState<boolean> */
type ExpectedToggleReturn = readonly [boolean, () => void, (value: boolean) => void];
type FirstElement = ExpectedToggleReturn[0];

const _check: FirstElement = true;
void _check;
