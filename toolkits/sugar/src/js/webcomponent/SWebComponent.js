import __deepMerge from '../object/deepMerge';
import __SPromise from '../promise/SPromise';
import __parse from '../string/parse';
import __toString from '../string/toString';
import __when from '../dom/when';
import __camelize from '../string/camelize';
import __paramCase from '../string/paramCase';
import __uncamelize from '../string/uncamelize';
import __validateValue from '../validation/value/validateValue';
import __watch from '../object/watch';
import { getComponentMetas } from './register';
import __uniqid from '../string/uniqid';
import __dispatch from '../event/dispatch';
import __on from '../event/on';
import __SLitHtmlWebComponent from './SLitHtmlWebComponent';

/**
 * @name              SWebComponent
 * @namespace           js.webcomponent
 * @type              Class
 * @extends           HTMLElement
 *
 * // TODO: example
 *
 * Base class that allows you to create easily new webcomponents and handle things like attributes updates,
 * base css (scss) importing, etc... Here's a list a features that this class covers:
 * - Listen for attributes changes
 * - Mount the component at a certain point in time (inViewport, visible, etc...)
 * - **Automatically cast the attributes** to their proper js variable types (Array, Object, String, etc...)
 * - **Physical props** : Specify some props that will ALWAYS be present as attribute on the component for styling purpose
 * - Define some **default CSS** that will be injected in the head automatically
 * - Specify some **required props**
 * - **Full lifecycle management** through "events":
 * 	  - attach: Dispatched when the component is attached to the DOM
 *    - detach: Dispatched when the component is detached from the DOM
 *    - mounting: Dispatched when the component starts to mount itself (before mountWhen and mountDependencies execution)
 *    - mounted: Dispatched when the component has be mounted properly
 *    - prop|prop.{name}: Dispatched when a property has been updated, removed or added
 *      - The object format sended with the event is this one:
 *        - { prop: 'propName', action: 'update|remove|add', value: 'Something', previousValue: 'Other' }
 * - **Mount dependencies** : This will allows you to set some promises that have to be resolved before mounting the component
 *
 * @param       {Object}        [settings={}]         A setting object to configure your webcomponent instance:
 * - defaultProps ({}) {Object}: Specify the default properties values
 * - physicalProps ([]) {Array<String>}: List all the properties that need to be ALWAYS on the html element (for styling purpose for example...)
 * - requiredProps ([]) {Array<String>}: List all the properties that MUST be passed to the component
 *
 * @example         js
 * import SWebComponent from '@coffeekraken/sugar/js/webcomponent/SWebComponent';
 * class MyCoolComponent extends SWebComponent {
 *
 *    constructor() {
 *      super();
 *    }
 *
 * }
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

const _sWebComponentPromise = new __SPromise(() => {}).start();

function SWebComponent(extend = HTMLElement) {
  return class SWebComponent extends extend {
    _settedAttributesStack = {};

    /**
     * @name          _promise
     * @type          SPromise
     * @private
     *
     * Store the SPromise instance used to "dispatch" some events
     * that you can subscribe using the "on" exposed method
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _promise = null;

    /**
     * @name          _props
     * @type          Object
     * @private
     *
     * Store all the computed properties setted using the "setProp" method or through the
     * attributes
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _props = {};

    /**
     * @name          _settings
     * @type          Object
     * @private
     *
     * Store all the webcomponent settings like "physicalProps", "requiredProps", etc...
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _settings = {};

    /**
     * @name        observedAttributes
     * @type        Function
     * @get
     * @static
     *
     * This medhod simply return the list of props that will be
     * observed by the customElements under the hood system.
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static get observedAttributes() {
      return Object.keys(this.props).map((name) => __uncamelize(name));
    }

    /**
     * @name          constructor
     * @type          Function
     * @constructor
     *
     * Constructor
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
      // init base html element
      super();
      // get component metas
      this._metas = getComponentMetas(this.constructor.componentName);
      // save the settings
      this._settings = __deepMerge(
        {
          id: this.getAttribute('id') || __uniqid(),
          props: this.constructor.props || {}
        },
        this._metas.settings || {},
        settings
      );

      // create the SPromise instance
      this._promise = new __SPromise(() => {}).start();

      // apply the $node class
      const currentClassName = this.getAttribute('class') || '';
      this.setAttribute(
        'class',
        `${currentClassName} ${this.className(`node`)}`
      );

      this.on('mounted{1}', () => {
        // dispatch a ready event
        if (!this.lit) {
          // the Lit HTML class dispatch the ready event after having rendering the template the first time
          this.dispatch('ready', this);
        }
      });

      // launch the mounting process
      setTimeout(this._mount.bind(this));
    }

    /**
     * @name          metas
     * @type          Object
     * @get
     *
     * This property store all the component metas informations like the name,
     * the type, what it is extending, etc...
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get metas() {
      return {
        instance: this,
        $node: this,
        ...this._metas
      };
    }

    /**
     * @name          _mount
     * @type          Function
     * @private
     * @async
     *
     * This method handle the mounting of the component
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    async _mount() {
      // dispatch mounting event
      this.dispatch('mounting', this);

      // handle props
      for (const key in this._settings.props) {
        let attr = this.getAttribute(__uncamelize(key));
        if (!attr && this.hasAttribute(__uncamelize(key))) {
          attr = true;
        }
        this._props[key] = {
          ...this._settings.props[key],
          value: attr ? __parse(attr) : this._settings.props[key].default,
          previousValue: undefined
        };
      }

      // handle props
      for (const key in this._settings.props) {
        // if need to be watches deeply
        if (this._props[key].watch) {
          this._props[key] = __watch(this._props[key], {
            deep: this._props[key].watch === 'deep'
          });
          this._props[key].on('value.*:+(set|delete|push|pop)', (update) => {
            if (update.path.split('.').length === 1) {
              this.prop(update.path, update.value);
            } else {
              this.handleProp(update.path, this._props[key]);
            }
          });
        }
      }

      // wait until the component match the mountDependencies and mountWhen status
      await this._mountDependencies();

      // check props definition
      this._checkPropsDefinition();

      // handle physical props
      this._handlePhysicalProps();

      // dispatch mounted event
      this._isMounted = true;
      this.dispatch('mounted', this);
    }

    /**
     * @name          handleProp
     * @type          Function
     * @async
     *
     * This method is supposed to be overrided by your component integration
     * to handle the props updates and delete actions.
     * The passed description object has this format:
     * ```js
     * {
     *    action: 'set|delete',
     *    path: 'something.cool',
     *    oldValue: '...',
     *    value: '...'
     * }
     * ```
     *
     * @param     {String}      prop      The property name that has been updated or deleted
     * @param     {Object}      descriptionObj      The description object that describe the update or delete action
     * @return    {Promise}                A promise that has to be resolved once the update has been handled correctly. You have to pass the prop variable to the resolve function
     *
     * @since     2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    handleProp(prop, descriptionObj) {
      return new Promise((resolve, reject) => {
        resolve(prop);
      });
    }

    /**
     * @name          on
     * @type          Function
     *
     * Method used to subscribe to the "events" dispatched
     * during the lifecycle of the component. Here's the list of events:
     * - attach: Dispatched when the component is attached to the DOM
     * - detach: Dispatched when the component is detached from the DOM
     * - mounting: Dispatched when the component starts to mount itself (before mountWhen and mountDependencies execution)
     * - mounted: Dispatched when the component has be mounted properly
     * - prop|prop.{name}: Dispatched when a property has been updated, removed or added
     *    - The object format sended with the event is this one:
     *      - { prop: 'propName', action: 'update|remove|add', value: 'Something', previousValue: 'Other' }
     *
     * @param       {String}        event         The event you want to subscribe to
     * @param       {Function}      callback      The callback function that has to be called
     * @return      {SPromise}                    The SPromise used in this instance
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    on(event, callback) {
      return this._promise.on(event, callback);
    }

    /**
     * @name          dispatch
     * @type          Function
     * @private
     *
     * This method is used to dispatch events simultaneously through the SPromise internal instance on which you can subscribe using the "on" method,
     * and through the global "sugar.js.event.dispatch" function on which you can subscribe using the function "sugar.js.event.on"
     *
     * @param       {String}        name          The event name to dispatch
     * @param       {Mixed}         value         The value to attach to the event
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    dispatch(name, value) {
      // dispatch event through the SPromise internal instance
      this._promise.trigger(name, value || this);
      // dispatch a general event
      __dispatch(`${this.metas.dashName}.${name}`, {
        target: this,
        value
      });
      __dispatch(`${this.metas.dashName}#${this._settings.id}.${name}`, {
        target: this,
        value
      });
      setTimeout(() => {
        // dispatch an SWebComponent level event
        _sWebComponentPromise.trigger(`${this.metas.dashName}.${name}`, {
          target: this,
          value
        });
        _sWebComponentPromise.trigger(
          `${this.metas.dashName}#${this._settings.id}.${name}`,
          {
            target: this,
            value
          }
        );
      });
    }

    /**
     * @name          _mountDependencies
     * @type          Function
     * @private
     * @async
     *
     * This method simply delay the mounting process of the component
     * based on different settings "properties":
     * - mountWhen (null) {String}: Specify when you want the component to be mounted. Can be:
     *    - inViewport: Mount the component only when it appears in the viewport
     *    - visible: Mount the component when the component became visible (like display:none; to display:block; for example)
     *    - domReady: Mount the component when the DOM is ready
     *    - transitionEnd. Mount the component when the transition is ended
     * - mountDependencies (null) {Function|Array<Function>}: Specify one/some function(s) that returns a Promise and that need to be all resolved before mounting the component
     *
     * @return      {Promise}               Return a promise that will be resolved once every "dependencies" are satisfied
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _mountDependencies() {
      return new Promise((resolve, reject) => {
        let promises = [];

        // check if we have a "mountWhen" setting specified
        if (this._settings.mountWhen) {
          promises.push(__when(this._settings.mountWhen));
        }

        // check if we have one/some "mountDependencies" setting specified
        if (this._settings.mountDependencies) {
          const depsFns = [...this._settings.mountDependencies];
          depsFns.forEach((fn) => {
            promises.push(fn());
          });
        }

        // wait until all promises are resolved
        Promise.all(promises).then(() => {
          resolve();
        });
      });
    }

    /**
     * @name          connectedCallback
     * @type          Function
     *
     * Called when the component is attached to the dom
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    connectedCallback() {
      // dispatch "event"
      setTimeout(() => {
        this.dispatch('attach', this);
      });
    }

    /**
     * @name          disconnectedCallback
     * @type          Function
     *
     * Called when the component is detached from the dom
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    disconnectedCallback() {
      // dispatch "event"
      this.dispatch('detach', this);
    }

    /**
     * @name            attributeChangedCallback
     * @type            Function
     *
     * Called when an attribute is removed, added or updated
     *
     * @param     {String}      attrName      The attribute name
     * @param     {Mixed}       oldVal        The old attribute value
     * @param     {Mixed}       newVal        The new attribute value
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    attributeChangedCallback(attrName, oldVal, newVal) {
      if (!this._isMounted) return;
      if (this._settedAttributesStack[attrName]) return;

      // const previousValue = __parse(oldVal);
      const newValue = __parse(newVal) || false;

      // set the value into the props
      this.prop(attrName, newValue);
    }

    /**
     * @name            className
     * @type            Function
     *
     * This method return you a className generated depending on the
     * webcomponent name
     *
     * @param       {String}      cls         The class name to use
     * @return      {String}                  The generated class name
     *
     * @since       2.0.0
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    className(cls = '') {
      const originalName = __uncamelize(this.constructor.name).replace(
        '-web-component',
        ''
      );

      const hasDot = cls.match(/^\./);
      cls = cls.replace('.', '');

      let finalCls;
      if (cls.match(/^(--)/)) finalCls = `${this.metas.dashName}${cls}`;
      else if (cls !== '') finalCls = `${this.metas.dashName}__${cls}`;
      else finalCls = this.metas.dashName;

      if (cls.match(/^(--)/)) {
        finalCls = `${hasDot ? '.' : ''}${originalName}-bare${cls} ${
          hasDot ? '.' : ''
        }${finalCls}`;
      } else if (cls !== '') {
        finalCls = `${hasDot ? '.' : ''}${originalName}-bare__${cls} ${
          hasDot ? '.' : ''
        }${finalCls}`;
      } else {
        finalCls = `${hasDot ? '.' : ''}${originalName}-bare ${
          hasDot ? '.' : ''
        }${finalCls}`;
      }

      return finalCls;
    }

    /**
     * @name        prop
     * @type        Function
     *
     * Get of set a property
     *
     * @param       {String}      prop      The property you want to get/set
     * @param       {Mixed}       [value=undefined]    The value you want to set
     * @return      {Mixed}                 The property value
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    prop(prop, value = undefined) {
      // camelize the attribute name
      prop = __camelize(prop);

      if (value === undefined) {
        return this._props[prop] ? this._props[prop].value : undefined;
      }
      this._props[prop].previousValue = this._props[prop]
        ? this._props[prop].value
        : undefined;
      this._props[prop].value = value;

      this.handleProp(prop, this._props[prop]);

      // handle physical props
      this._handlePhysicalProps(prop);

      // trigger a "prop" event
      this._triggerPropsEvents(prop);

      return value;
    }

    /**
     * @name        _triggerPropsEvents
     * @type        Function
     * @private
     *
     * This method simply trigger a prop|prop.{name} event through the SPromise instance.
     *
     * @param     {String}      prop      The property name to trigger event for
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _triggerPropsEvents(prop) {
      // trigger a "prop" event
      const eventObj = {
        prop,
        action:
          this._props[prop].previousValue !== null
            ? this._props[prop].value !== null
              ? 'set'
              : 'delete'
            : 'set',
        value: this._props[prop].value,
        previousValue: this._props[prop].previousValue
      };

      this.dispatch(`prop.${prop}.${eventObj.action}`, eventObj);
    }

    /**
     * @name        _handlePhysicalProps
     * @type        Function
     * @private
     *
     * This method make sure that all the defined physical props are
     * setted as attribute on the DOM element
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _handlePhysicalProps(...props) {
      if (!props || props.length === 0) props = Object.keys(this._props);

      // loop on each required props
      props.forEach((prop) => {
        if (!this._props[prop].physical) return;

        const value = this._props[prop].value;

        // if the value is false, remove the attributee from the dom node
        if (value === undefined || value === null || value === false) {
          this.removeAttribute(prop);
          return;
        }

        if (!this.getAttribute(prop)) {
          // set the attribute with the value
          this._settedAttributesStack[prop] = true;
          this.setAttribute(prop, __toString(value));
          delete this._settedAttributesStack[prop];
        } else {
          const currentAttributeValue = this.getAttribute(prop);
          const currentValueStringified = __toString(value);
          if (currentAttributeValue !== currentValueStringified) {
            this._settedAttributesStack[prop] = true;
            this.setAttribute(prop, currentValueStringified);
            delete this._settedAttributesStack[prop];
          }
        }
      });
    }

    /**
     * @name        _checkPropsDefinition
     * @type        Function
     * @private
     *
     * This method simply check a property value depending on his definition such as type, required, etc...
     * If you pass no props to check, it will check all the registered ones.
     *
     * @param       {Array<String>|String}        ...props        The properties to check
     *
     * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _checkPropsDefinition(...props) {
      if (!props || props.length === 0) props = Object.keys(this._props);
      props.forEach((prop) => {
        const propObj = this._props[prop];

        const validationResult = __validateValue(
          propObj.value,
          propObj,
          `${this.constructor.name}.props.${prop}`
        );
        if (validationResult !== true) throw new Error(validationResult);
      });
    }
  };
}

/**
 * @name        on
 * @type        Function
 * @static
 *
 * This method can be used to subscribe to some SWebComponent instances events
 * like "SFiltrableInput.ready", etc...
 *
 * @param       {String}      name        The event name to subscribe to
 * @param       {Function}    callback    The callback function to call
 * @return      {Function}                A function that you can use to unsubscribe to this particular event
 *
 * @since       2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SWebComponent.on = (name, callback) => {
  _sWebComponentPromise.on(name, callback);
  return () => {
    _sWebComponentPromise.off(name, callback);
  };
};

export default SWebComponent;