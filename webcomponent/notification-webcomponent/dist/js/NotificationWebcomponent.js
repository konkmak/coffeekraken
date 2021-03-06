"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SWebComponent = _interopRequireDefault(require("@coffeekraken/sugar/js/core/SWebComponent"));

var _prependChild = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/prependChild"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _getAnimationProperties = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/getAnimationProperties"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name 		NotificationWebcomponent
 * @namespace       notification-webcomponent
 * @type      Class
 * @extends 	SWebComponent
 *
 * Display nice and fully customizable toast like notification.
 * Features :
 * - Align on the side you want
 * - Quick title, body and icon options
 * - Actions management
 * - Dismissable option allow to dismiss notification by click on it
 *
 * @example 	html
 * <ck-notification title="Hello World" body="Pellentesque fringilla velit at tempor eleifend. Vestibulum finibus lacus et."></ck-notification>
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
//
// @TODO : add event support in documentation
// * @event
//  * @name 		dismiss
//  * Event dispatched when the notification is dismissed. A value is attached to this event if provided.
// */
class NotificationWebcomponent extends _SWebComponent.default {
  /**
   * Store the different notifications containers
   * groupes by side
   * @protected
    * @static
   */

  /**
    * @name      notify
    * @namespace       notification-webcomponent
    * @type      Function
    *
   * Static notification factory. You need to have the actual component registered into your page.
    *
   * @param 		{Object} 		props 		The notification property object
   * @param 		{String} 		[tagname=ck-notification] 	The component tagname to create
   * @return 		{NotificationWebcomponent} 		The notification dom element
    *
   * @example 	js
   * import NotificationWebcomponentClass from '@coffeekraken/notification-webcomponent/js/class'
   * NotificationWebcomponentClass.notify({
   * 	title : "Hello World",
   * 	body : "In eleifend, tellus scelerisque auctor ultrices, velit neque porttitor ante, non fermentum ligula sem in mauris. Quisque nunc sem, tincidunt."
   * });
    *
    * @author 		Olivier Bossel <olivier.bossel@gmail.com>
   */
  static notify(props, tagname = 'ck-notification') {
    const notificationElm = document.createElement(tagname); // append to body

    document.body.appendChild(notificationElm); // set props

    notificationElm.setProps(props); // return the notification elm

    return notificationElm;
  }
  /**
   * Default props
   * @definition 		SWebComponent.defaultProps
   * @protected
    * @static
   */


  static get defaultProps() {
    return {
      /**
       * Specify the notification title
       * @prop
       * @type 		{String}
       */
      title: null,

      /**
       * Specify the body of the notification
       * @prop
       * @type 		{String}
       */
      body: null,

      /**
       * Specify the value that will be passed with the dismiss event when the notification is dismissed by clicking on it
       * or when clicking an action that has no value assigned.
       * @prop
       * @type 		{Mixed}
       */
      value: null,

      /**
       * Specify the default action object
       * @prop
       * @type 		{Object}
       */
      actionsProps: {},

      /**
       * Specify some actions
       * Action object:
       * ```
       * {
       * 	label : 'Ok',
       * 	dismiss : true,
       * 	href : null,
       * 	target : '_blank'
       * }
       * ```
       * @prop
       * @type 		{Array<Object>}
       */
      actions: [],

      /**
       * Set if is dismissable by clicking on it or not
       * @prop
       * @type 		{Boolean}
       */
      dismissable: true,

      /**
       * Specify the notification type for styling purpose
       * @prop
       * @type 		{String}
       */
      type: null,

      /**
       * Specify the life time of the notification
       * @prop
       * @type 		{Number}
       */
      timeout: null,

      /**
       * Specify the side where the notification has to appear
       * @prop
       * @type 		{String}
       * @values 		tl | t | tr | bl | b | br
       */
      side: 'tr',

      /**
       * Callback on dismiss
       * @prop
       * @type 		{Function}
       */
      onDismiss: null
    };
  }
  /**
   * Physical props
   * @definition 		SWebComponent.physicalProps
   * @protected
    * @static
   */


  static get physicalProps() {
    return ['type'];
  }
  /**
   * Css
   * @protected
    * @static
   */


  static defaultCss(componentName, componentNameDash) {
    return `
			${componentNameDash} {
				display : block;
			}
			.${componentNameDash}-container {
				position: fixed;
				z-index:10;
			}
			.${componentNameDash}-container.${componentNameDash}--tr {
				top: 0; right:0;
			}
			.${componentNameDash}-container.${componentNameDash}--tl {
				top: 0; left:0;
			}
			.${componentNameDash}-container.${componentNameDash}--t {
				top: 0; left:50%;
				transform: translateX(-50%);
			}
			.${componentNameDash}-container.${componentNameDash}--br {
				bottom: 0; right:0;
			}
			.${componentNameDash}-container.${componentNameDash}--bl {
				bottom: 0; left:0;
			}
			.${componentNameDash}-container.${componentNameDash}--b {
				bottom: 0; left:50%;
				transform: translateX(-50%);
			}
			.${componentNameDash}--interactive {
				cursor:pointer;
			}
			.${componentNameDash}__actions {
				display: flex;
				flex-flow: row wrap;
				list-style: none;
			}
			.${componentNameDash}__action {
				flex:1 1 auto;
				cursor: pointer;
			}
		`;
  }
  /**
   * Component will mount
  	 * @definition 		SWebComponent.componentWillMount
   * @protected
   */


  componentWillMount() {
    super.componentWillMount();
    this._refs = {};
  }
  /**
   * Mount component
   * @definition 		SWebComponent.componentMount
   * @protected
   */


  componentMount() {
    super.componentMount(); // create the container

    this._createContainer(); // handle content


    this._buildHtml(); // add class


    this.classList.add(this._componentNameDash); // add type class

    if (this.props.type) {
      this.classList.add(`${this._componentNameDash}--${this.props.type}`);
    } // if the notification has an action, add the interactive class


    if (this.props.action || this.props.dismissable) {
      this.classList.add(`${this._componentNameDash}--interactive`);
    } // push the element inside his container


    if (this.props.side.substr(0, 1) === 'b') {
      (0, _prependChild.default)(this, this._refs.container);
    } else {
      this._refs.container.appendChild(this);
    }

    [].forEach.call(this.querySelectorAll(`.${this._componentNameDash}__actions`), dismissElm => {
      dismissElm.addEventListener('click', e => {
        e.stopPropagation();
      });
    }); // listen for click on dismiss elements inside notification

    [].forEach.call(this.querySelectorAll(`[${this._componentNameDash}-dismiss]`), dismissElm => {
      dismissElm.addEventListener('click', e => {
        const idx = e.currentTarget.getAttribute(`${this._componentNameDash}-action-idx`);
        this.dismiss(this.props.actions[idx].value);
      });
    }); // handle dismissable

    if (this.props.dismissable) {
      this.addEventListener('click', e => {
        this.dismiss();
      });
    } // handle timeout


    if (this.props.timeout) {
      this._dismissTimeout = setTimeout(() => {
        // dismiss the notification
        this.dismiss();
      }, this.props.timeout);
    }
  }
  /**
   * Component unmount
   * @definition 		SWebComponent.componentUnmount
   * @protected
   */


  componentUnmount() {
    super.componentUnmount();
  }
  /**
   * Component will receive prop
   * @definition 		SWebComponent.componentWillReceiveProp
   * @protected
   */


  componentWillReceiveProp(name, newVal, oldVal) {
    switch (name) {}
  }
  /**
   * Render the component
   * Here goes the code that reflect the this.props state on the actual html element
   * @definition 		SWebComponent.render
   * @protected
   */


  render() {
    super.render();
  }
  /**
   * Create the notifications container if needed
   */


  _createContainer() {
    if (NotificationWebcomponent.notificationsContainers[this.props.side]) {
      this._refs.container = NotificationWebcomponent.notificationsContainers[this.props.side];
      return;
    }

    let containerElm = document.createElement('div');
    containerElm.className = `${this._componentNameDash}-container`;
    containerElm.classList.add(`${this._componentNameDash}--${this.props.side}`); // save reference for others notifications

    NotificationWebcomponent.notificationsContainers[this.props.side] = containerElm; // append to document

    document.body.appendChild(containerElm); // save the reference

    this._refs.container = containerElm;
  }
  /**
   * Build the notification html
   */


  _buildHtml() {
    // template
    let metasHtml = [],
        metasElm = document.createElement('div'),
        actionsHtml = [],
        actionsElm = document.createElement('ul');

    if (this.props.icon) {
      metasHtml = metasHtml.concat([`<i class="${this.props.icon} ${this._componentNameDash}__icon"></i>`]);
    }

    if (this.props.title) {
      metasHtml = metasHtml.concat([`<h1 class="${this._componentNameDash}__title">`, this.props.title, '</h1>']);
    }

    if (this.props.body) {
      metasHtml = metasHtml.concat([`<p class="${this._componentNameDash}__body">`, this.props.body, '</p>']);
    }

    if (this.props.actions.length) {
      // create actions
      this.props.actions.forEach((action, idx) => {
        // extend default action with action
        action = (0, _merge.default)({}, this.props.actionsProps, action); // create the action html

        actionsHtml = actionsHtml.concat([`<li class="${this._componentNameDash}__action" ${action.dismiss ? `${this._componentNameDash}-dismiss` : ""} ${this._componentNameDash}-action-idx="${idx}">`, `<a class="${this._componentNameDash}__action-link ${action.class ? action.class : ''}" ${action.href ? `href="${action.href}"` : ''} ${action.target ? `target="${action.target}"` : ''}>`, action.label, '</a>', '</li>']);
      });
    } // append classes


    metasElm.className = `${this._componentNameDash}__metas`;
    actionsElm.className = `${this._componentNameDash}__actions`; // create structure

    metasElm.innerHTML = metasHtml.join("\n");
    actionsElm.innerHTML = actionsHtml.join("\n"); // inject the html

    if (this.props.title || this.props.body) {
      (0, _prependChild.default)(metasElm, this);
    }

    if (this.props.actions.length) {
      this.appendChild(actionsElm);
    } // this.innerHTML = template.join("\n");

  }
  /**
    * @name      dismiss
    * @namespace       notification-webcomponent
    * @type      Function
    *
   * Dismiss the notification
    *
   * @param 		{Mixed} 		[data=null]		The data passed to the dismiss
    *
    * @author 		Olivier Bossel <olivier.bossel@gmail.com>
   */


  dismiss(data = null) {
    // handle data
    if (!data) data = this.props.value; // clear the dismiss timeout

    clearTimeout(this._dismissTimeout); // adding out class

    this.classList.add(`${this._componentNameDash}--out`);
    const animationProps = (0, _getAnimationProperties.default)(this);
    setTimeout(() => {
      // dismiss the notification
      this.parentNode.removeChild(this);
    }, animationProps.totalDuration); // callback

    this.props.onDismiss && this.props.onDismiss(data); // dispatch event

    this.dispatchComponentEvent('dismiss', data);
  }

}

exports.default = NotificationWebcomponent;

_defineProperty(NotificationWebcomponent, "notificationsContainers", {});

module.exports = exports.default;