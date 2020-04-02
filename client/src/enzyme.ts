
import * as Enzyme from 'enzyme'
import { configure, shallow, mount, render } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
export { shallow, mount, render };
export default Enzyme;