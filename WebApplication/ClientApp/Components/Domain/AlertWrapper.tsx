import * as React from 'react';

export function	wrap(Child: React.ComponentClass<any>) {
	return class extends React.Component<any, any> {
		render() {
			return <Child />;
		}
	}
}
