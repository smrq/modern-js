/* tslint:disable */
declare module 'varless' {
	export function get(lessFile: string, variableName: string): string;
	export function get(variableName: string): string;
}
