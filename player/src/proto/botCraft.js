/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const botCraft = $root.botCraft = (() => {

    /**
     * Namespace botCraft.
     * @exports botCraft
     * @namespace
     */
    const botCraft = {};

    botCraft.Action = (function() {

        /**
         * Properties of an Action.
         * @memberof botCraft
         * @interface IAction
         * @property {Object.<string,botCraft.IEntityAction>|null} [entityActions] Action entityActions
         */

        /**
         * Constructs a new Action.
         * @memberof botCraft
         * @classdesc Represents an Action.
         * @implements IAction
         * @constructor
         * @param {botCraft.IAction=} [properties] Properties to set
         */
        function Action(properties) {
            this.entityActions = {};
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Action entityActions.
         * @member {Object.<string,botCraft.IEntityAction>} entityActions
         * @memberof botCraft.Action
         * @instance
         */
        Action.prototype.entityActions = $util.emptyObject;

        /**
         * Creates a new Action instance using the specified properties.
         * @function create
         * @memberof botCraft.Action
         * @static
         * @param {botCraft.IAction=} [properties] Properties to set
         * @returns {botCraft.Action} Action instance
         */
        Action.create = function create(properties) {
            return new Action(properties);
        };

        /**
         * Encodes the specified Action message. Does not implicitly {@link botCraft.Action.verify|verify} messages.
         * @function encode
         * @memberof botCraft.Action
         * @static
         * @param {botCraft.IAction} message Action message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Action.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.entityActions != null && Object.hasOwnProperty.call(message, "entityActions"))
                for (let keys = Object.keys(message.entityActions), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 0 =*/8).int32(keys[i]);
                    $root.botCraft.EntityAction.encode(message.entityActions[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                }
            return writer;
        };

        /**
         * Encodes the specified Action message, length delimited. Does not implicitly {@link botCraft.Action.verify|verify} messages.
         * @function encodeDelimited
         * @memberof botCraft.Action
         * @static
         * @param {botCraft.IAction} message Action message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Action.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Action message from the specified reader or buffer.
         * @function decode
         * @memberof botCraft.Action
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {botCraft.Action} Action
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Action.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.botCraft.Action(), key, value;
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (message.entityActions === $util.emptyObject)
                        message.entityActions = {};
                    let end2 = reader.uint32() + reader.pos;
                    key = 0;
                    value = null;
                    while (reader.pos < end2) {
                        let tag2 = reader.uint32();
                        switch (tag2 >>> 3) {
                        case 1:
                            key = reader.int32();
                            break;
                        case 2:
                            value = $root.botCraft.EntityAction.decode(reader, reader.uint32());
                            break;
                        default:
                            reader.skipType(tag2 & 7);
                            break;
                        }
                    }
                    message.entityActions[key] = value;
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Action message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof botCraft.Action
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {botCraft.Action} Action
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Action.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Action message.
         * @function verify
         * @memberof botCraft.Action
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Action.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.entityActions != null && message.hasOwnProperty("entityActions")) {
                if (!$util.isObject(message.entityActions))
                    return "entityActions: object expected";
                let key = Object.keys(message.entityActions);
                for (let i = 0; i < key.length; ++i) {
                    if (!$util.key32Re.test(key[i]))
                        return "entityActions: integer key{k:int32} expected";
                    {
                        let error = $root.botCraft.EntityAction.verify(message.entityActions[key[i]]);
                        if (error)
                            return "entityActions." + error;
                    }
                }
            }
            return null;
        };

        /**
         * Creates an Action message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof botCraft.Action
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {botCraft.Action} Action
         */
        Action.fromObject = function fromObject(object) {
            if (object instanceof $root.botCraft.Action)
                return object;
            let message = new $root.botCraft.Action();
            if (object.entityActions) {
                if (typeof object.entityActions !== "object")
                    throw TypeError(".botCraft.Action.entityActions: object expected");
                message.entityActions = {};
                for (let keys = Object.keys(object.entityActions), i = 0; i < keys.length; ++i) {
                    if (typeof object.entityActions[keys[i]] !== "object")
                        throw TypeError(".botCraft.Action.entityActions: object expected");
                    message.entityActions[keys[i]] = $root.botCraft.EntityAction.fromObject(object.entityActions[keys[i]]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an Action message. Also converts values to other types if specified.
         * @function toObject
         * @memberof botCraft.Action
         * @static
         * @param {botCraft.Action} message Action
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Action.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.objects || options.defaults)
                object.entityActions = {};
            let keys2;
            if (message.entityActions && (keys2 = Object.keys(message.entityActions)).length) {
                object.entityActions = {};
                for (let j = 0; j < keys2.length; ++j)
                    object.entityActions[keys2[j]] = $root.botCraft.EntityAction.toObject(message.entityActions[keys2[j]], options);
            }
            return object;
        };

        /**
         * Converts this Action to JSON.
         * @function toJSON
         * @memberof botCraft.Action
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Action.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Action;
    })();

    botCraft.EntityAction = (function() {

        /**
         * Properties of an EntityAction.
         * @memberof botCraft
         * @interface IEntityAction
         * @property {botCraft.IMoveAction|null} [moveAction] EntityAction moveAction
         * @property {botCraft.IBuildAction|null} [buildAction] EntityAction buildAction
         * @property {botCraft.IAttackAction|null} [attackAction] EntityAction attackAction
         * @property {botCraft.IRepairAction|null} [repairAction] EntityAction repairAction
         */

        /**
         * Constructs a new EntityAction.
         * @memberof botCraft
         * @classdesc Represents an EntityAction.
         * @implements IEntityAction
         * @constructor
         * @param {botCraft.IEntityAction=} [properties] Properties to set
         */
        function EntityAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EntityAction moveAction.
         * @member {botCraft.IMoveAction|null|undefined} moveAction
         * @memberof botCraft.EntityAction
         * @instance
         */
        EntityAction.prototype.moveAction = null;

        /**
         * EntityAction buildAction.
         * @member {botCraft.IBuildAction|null|undefined} buildAction
         * @memberof botCraft.EntityAction
         * @instance
         */
        EntityAction.prototype.buildAction = null;

        /**
         * EntityAction attackAction.
         * @member {botCraft.IAttackAction|null|undefined} attackAction
         * @memberof botCraft.EntityAction
         * @instance
         */
        EntityAction.prototype.attackAction = null;

        /**
         * EntityAction repairAction.
         * @member {botCraft.IRepairAction|null|undefined} repairAction
         * @memberof botCraft.EntityAction
         * @instance
         */
        EntityAction.prototype.repairAction = null;

        /**
         * Creates a new EntityAction instance using the specified properties.
         * @function create
         * @memberof botCraft.EntityAction
         * @static
         * @param {botCraft.IEntityAction=} [properties] Properties to set
         * @returns {botCraft.EntityAction} EntityAction instance
         */
        EntityAction.create = function create(properties) {
            return new EntityAction(properties);
        };

        /**
         * Encodes the specified EntityAction message. Does not implicitly {@link botCraft.EntityAction.verify|verify} messages.
         * @function encode
         * @memberof botCraft.EntityAction
         * @static
         * @param {botCraft.IEntityAction} message EntityAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EntityAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.moveAction != null && Object.hasOwnProperty.call(message, "moveAction"))
                $root.botCraft.MoveAction.encode(message.moveAction, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.buildAction != null && Object.hasOwnProperty.call(message, "buildAction"))
                $root.botCraft.BuildAction.encode(message.buildAction, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.attackAction != null && Object.hasOwnProperty.call(message, "attackAction"))
                $root.botCraft.AttackAction.encode(message.attackAction, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.repairAction != null && Object.hasOwnProperty.call(message, "repairAction"))
                $root.botCraft.RepairAction.encode(message.repairAction, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified EntityAction message, length delimited. Does not implicitly {@link botCraft.EntityAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof botCraft.EntityAction
         * @static
         * @param {botCraft.IEntityAction} message EntityAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EntityAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EntityAction message from the specified reader or buffer.
         * @function decode
         * @memberof botCraft.EntityAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {botCraft.EntityAction} EntityAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EntityAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.botCraft.EntityAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.moveAction = $root.botCraft.MoveAction.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.buildAction = $root.botCraft.BuildAction.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.attackAction = $root.botCraft.AttackAction.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.repairAction = $root.botCraft.RepairAction.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EntityAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof botCraft.EntityAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {botCraft.EntityAction} EntityAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EntityAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EntityAction message.
         * @function verify
         * @memberof botCraft.EntityAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EntityAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.moveAction != null && message.hasOwnProperty("moveAction")) {
                let error = $root.botCraft.MoveAction.verify(message.moveAction);
                if (error)
                    return "moveAction." + error;
            }
            if (message.buildAction != null && message.hasOwnProperty("buildAction")) {
                let error = $root.botCraft.BuildAction.verify(message.buildAction);
                if (error)
                    return "buildAction." + error;
            }
            if (message.attackAction != null && message.hasOwnProperty("attackAction")) {
                let error = $root.botCraft.AttackAction.verify(message.attackAction);
                if (error)
                    return "attackAction." + error;
            }
            if (message.repairAction != null && message.hasOwnProperty("repairAction")) {
                let error = $root.botCraft.RepairAction.verify(message.repairAction);
                if (error)
                    return "repairAction." + error;
            }
            return null;
        };

        /**
         * Creates an EntityAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof botCraft.EntityAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {botCraft.EntityAction} EntityAction
         */
        EntityAction.fromObject = function fromObject(object) {
            if (object instanceof $root.botCraft.EntityAction)
                return object;
            let message = new $root.botCraft.EntityAction();
            if (object.moveAction != null) {
                if (typeof object.moveAction !== "object")
                    throw TypeError(".botCraft.EntityAction.moveAction: object expected");
                message.moveAction = $root.botCraft.MoveAction.fromObject(object.moveAction);
            }
            if (object.buildAction != null) {
                if (typeof object.buildAction !== "object")
                    throw TypeError(".botCraft.EntityAction.buildAction: object expected");
                message.buildAction = $root.botCraft.BuildAction.fromObject(object.buildAction);
            }
            if (object.attackAction != null) {
                if (typeof object.attackAction !== "object")
                    throw TypeError(".botCraft.EntityAction.attackAction: object expected");
                message.attackAction = $root.botCraft.AttackAction.fromObject(object.attackAction);
            }
            if (object.repairAction != null) {
                if (typeof object.repairAction !== "object")
                    throw TypeError(".botCraft.EntityAction.repairAction: object expected");
                message.repairAction = $root.botCraft.RepairAction.fromObject(object.repairAction);
            }
            return message;
        };

        /**
         * Creates a plain object from an EntityAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof botCraft.EntityAction
         * @static
         * @param {botCraft.EntityAction} message EntityAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EntityAction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.moveAction = null;
                object.buildAction = null;
                object.attackAction = null;
                object.repairAction = null;
            }
            if (message.moveAction != null && message.hasOwnProperty("moveAction"))
                object.moveAction = $root.botCraft.MoveAction.toObject(message.moveAction, options);
            if (message.buildAction != null && message.hasOwnProperty("buildAction"))
                object.buildAction = $root.botCraft.BuildAction.toObject(message.buildAction, options);
            if (message.attackAction != null && message.hasOwnProperty("attackAction"))
                object.attackAction = $root.botCraft.AttackAction.toObject(message.attackAction, options);
            if (message.repairAction != null && message.hasOwnProperty("repairAction"))
                object.repairAction = $root.botCraft.RepairAction.toObject(message.repairAction, options);
            return object;
        };

        /**
         * Converts this EntityAction to JSON.
         * @function toJSON
         * @memberof botCraft.EntityAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EntityAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EntityAction;
    })();

    botCraft.MoveAction = (function() {

        /**
         * Properties of a MoveAction.
         * @memberof botCraft
         * @interface IMoveAction
         * @property {botCraft.IPoint2D|null} [target] MoveAction target
         * @property {boolean|null} [findClosestPosition] MoveAction findClosestPosition
         * @property {boolean|null} [breakThrough] MoveAction breakThrough
         */

        /**
         * Constructs a new MoveAction.
         * @memberof botCraft
         * @classdesc Represents a MoveAction.
         * @implements IMoveAction
         * @constructor
         * @param {botCraft.IMoveAction=} [properties] Properties to set
         */
        function MoveAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MoveAction target.
         * @member {botCraft.IPoint2D|null|undefined} target
         * @memberof botCraft.MoveAction
         * @instance
         */
        MoveAction.prototype.target = null;

        /**
         * MoveAction findClosestPosition.
         * @member {boolean} findClosestPosition
         * @memberof botCraft.MoveAction
         * @instance
         */
        MoveAction.prototype.findClosestPosition = false;

        /**
         * MoveAction breakThrough.
         * @member {boolean} breakThrough
         * @memberof botCraft.MoveAction
         * @instance
         */
        MoveAction.prototype.breakThrough = false;

        /**
         * Creates a new MoveAction instance using the specified properties.
         * @function create
         * @memberof botCraft.MoveAction
         * @static
         * @param {botCraft.IMoveAction=} [properties] Properties to set
         * @returns {botCraft.MoveAction} MoveAction instance
         */
        MoveAction.create = function create(properties) {
            return new MoveAction(properties);
        };

        /**
         * Encodes the specified MoveAction message. Does not implicitly {@link botCraft.MoveAction.verify|verify} messages.
         * @function encode
         * @memberof botCraft.MoveAction
         * @static
         * @param {botCraft.IMoveAction} message MoveAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MoveAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.target != null && Object.hasOwnProperty.call(message, "target"))
                $root.botCraft.Point2D.encode(message.target, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.findClosestPosition != null && Object.hasOwnProperty.call(message, "findClosestPosition"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.findClosestPosition);
            if (message.breakThrough != null && Object.hasOwnProperty.call(message, "breakThrough"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.breakThrough);
            return writer;
        };

        /**
         * Encodes the specified MoveAction message, length delimited. Does not implicitly {@link botCraft.MoveAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof botCraft.MoveAction
         * @static
         * @param {botCraft.IMoveAction} message MoveAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MoveAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MoveAction message from the specified reader or buffer.
         * @function decode
         * @memberof botCraft.MoveAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {botCraft.MoveAction} MoveAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MoveAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.botCraft.MoveAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.target = $root.botCraft.Point2D.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.findClosestPosition = reader.bool();
                    break;
                case 3:
                    message.breakThrough = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MoveAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof botCraft.MoveAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {botCraft.MoveAction} MoveAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MoveAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MoveAction message.
         * @function verify
         * @memberof botCraft.MoveAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MoveAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.target != null && message.hasOwnProperty("target")) {
                let error = $root.botCraft.Point2D.verify(message.target);
                if (error)
                    return "target." + error;
            }
            if (message.findClosestPosition != null && message.hasOwnProperty("findClosestPosition"))
                if (typeof message.findClosestPosition !== "boolean")
                    return "findClosestPosition: boolean expected";
            if (message.breakThrough != null && message.hasOwnProperty("breakThrough"))
                if (typeof message.breakThrough !== "boolean")
                    return "breakThrough: boolean expected";
            return null;
        };

        /**
         * Creates a MoveAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof botCraft.MoveAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {botCraft.MoveAction} MoveAction
         */
        MoveAction.fromObject = function fromObject(object) {
            if (object instanceof $root.botCraft.MoveAction)
                return object;
            let message = new $root.botCraft.MoveAction();
            if (object.target != null) {
                if (typeof object.target !== "object")
                    throw TypeError(".botCraft.MoveAction.target: object expected");
                message.target = $root.botCraft.Point2D.fromObject(object.target);
            }
            if (object.findClosestPosition != null)
                message.findClosestPosition = Boolean(object.findClosestPosition);
            if (object.breakThrough != null)
                message.breakThrough = Boolean(object.breakThrough);
            return message;
        };

        /**
         * Creates a plain object from a MoveAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof botCraft.MoveAction
         * @static
         * @param {botCraft.MoveAction} message MoveAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MoveAction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.target = null;
                object.findClosestPosition = false;
                object.breakThrough = false;
            }
            if (message.target != null && message.hasOwnProperty("target"))
                object.target = $root.botCraft.Point2D.toObject(message.target, options);
            if (message.findClosestPosition != null && message.hasOwnProperty("findClosestPosition"))
                object.findClosestPosition = message.findClosestPosition;
            if (message.breakThrough != null && message.hasOwnProperty("breakThrough"))
                object.breakThrough = message.breakThrough;
            return object;
        };

        /**
         * Converts this MoveAction to JSON.
         * @function toJSON
         * @memberof botCraft.MoveAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MoveAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MoveAction;
    })();

    botCraft.BuildAction = (function() {

        /**
         * Properties of a BuildAction.
         * @memberof botCraft
         * @interface IBuildAction
         * @property {botCraft.EntityType|null} [entityType] BuildAction entityType
         * @property {botCraft.IPoint2D|null} [position] BuildAction position
         */

        /**
         * Constructs a new BuildAction.
         * @memberof botCraft
         * @classdesc Represents a BuildAction.
         * @implements IBuildAction
         * @constructor
         * @param {botCraft.IBuildAction=} [properties] Properties to set
         */
        function BuildAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BuildAction entityType.
         * @member {botCraft.EntityType} entityType
         * @memberof botCraft.BuildAction
         * @instance
         */
        BuildAction.prototype.entityType = 0;

        /**
         * BuildAction position.
         * @member {botCraft.IPoint2D|null|undefined} position
         * @memberof botCraft.BuildAction
         * @instance
         */
        BuildAction.prototype.position = null;

        /**
         * Creates a new BuildAction instance using the specified properties.
         * @function create
         * @memberof botCraft.BuildAction
         * @static
         * @param {botCraft.IBuildAction=} [properties] Properties to set
         * @returns {botCraft.BuildAction} BuildAction instance
         */
        BuildAction.create = function create(properties) {
            return new BuildAction(properties);
        };

        /**
         * Encodes the specified BuildAction message. Does not implicitly {@link botCraft.BuildAction.verify|verify} messages.
         * @function encode
         * @memberof botCraft.BuildAction
         * @static
         * @param {botCraft.IBuildAction} message BuildAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BuildAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.entityType != null && Object.hasOwnProperty.call(message, "entityType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.entityType);
            if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                $root.botCraft.Point2D.encode(message.position, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified BuildAction message, length delimited. Does not implicitly {@link botCraft.BuildAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof botCraft.BuildAction
         * @static
         * @param {botCraft.IBuildAction} message BuildAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BuildAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BuildAction message from the specified reader or buffer.
         * @function decode
         * @memberof botCraft.BuildAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {botCraft.BuildAction} BuildAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BuildAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.botCraft.BuildAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.entityType = reader.int32();
                    break;
                case 2:
                    message.position = $root.botCraft.Point2D.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BuildAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof botCraft.BuildAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {botCraft.BuildAction} BuildAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BuildAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BuildAction message.
         * @function verify
         * @memberof botCraft.BuildAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BuildAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.entityType != null && message.hasOwnProperty("entityType"))
                switch (message.entityType) {
                default:
                    return "entityType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    break;
                }
            if (message.position != null && message.hasOwnProperty("position")) {
                let error = $root.botCraft.Point2D.verify(message.position);
                if (error)
                    return "position." + error;
            }
            return null;
        };

        /**
         * Creates a BuildAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof botCraft.BuildAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {botCraft.BuildAction} BuildAction
         */
        BuildAction.fromObject = function fromObject(object) {
            if (object instanceof $root.botCraft.BuildAction)
                return object;
            let message = new $root.botCraft.BuildAction();
            switch (object.entityType) {
            case "WALL":
            case 0:
                message.entityType = 0;
                break;
            case "HOUSE":
            case 1:
                message.entityType = 1;
                break;
            case "BUILDER_BASE":
            case 2:
                message.entityType = 2;
                break;
            case "BUILDER_UNIT":
            case 3:
                message.entityType = 3;
                break;
            case "MELEE_BASE":
            case 4:
                message.entityType = 4;
                break;
            case "MELEE_UNIT":
            case 5:
                message.entityType = 5;
                break;
            case "RANGED_BASE":
            case 6:
                message.entityType = 6;
                break;
            case "RANGED_UNIT":
            case 7:
                message.entityType = 7;
                break;
            case "RESOURCE":
            case 8:
                message.entityType = 8;
                break;
            case "TURRET":
            case 9:
                message.entityType = 9;
                break;
            }
            if (object.position != null) {
                if (typeof object.position !== "object")
                    throw TypeError(".botCraft.BuildAction.position: object expected");
                message.position = $root.botCraft.Point2D.fromObject(object.position);
            }
            return message;
        };

        /**
         * Creates a plain object from a BuildAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof botCraft.BuildAction
         * @static
         * @param {botCraft.BuildAction} message BuildAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BuildAction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.entityType = options.enums === String ? "WALL" : 0;
                object.position = null;
            }
            if (message.entityType != null && message.hasOwnProperty("entityType"))
                object.entityType = options.enums === String ? $root.botCraft.EntityType[message.entityType] : message.entityType;
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = $root.botCraft.Point2D.toObject(message.position, options);
            return object;
        };

        /**
         * Converts this BuildAction to JSON.
         * @function toJSON
         * @memberof botCraft.BuildAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BuildAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BuildAction;
    })();

    botCraft.AttackAction = (function() {

        /**
         * Properties of an AttackAction.
         * @memberof botCraft
         * @interface IAttackAction
         * @property {number|null} [target] AttackAction target
         * @property {botCraft.IAutoAttack|null} [autoAttack] AttackAction autoAttack
         */

        /**
         * Constructs a new AttackAction.
         * @memberof botCraft
         * @classdesc Represents an AttackAction.
         * @implements IAttackAction
         * @constructor
         * @param {botCraft.IAttackAction=} [properties] Properties to set
         */
        function AttackAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AttackAction target.
         * @member {number} target
         * @memberof botCraft.AttackAction
         * @instance
         */
        AttackAction.prototype.target = 0;

        /**
         * AttackAction autoAttack.
         * @member {botCraft.IAutoAttack|null|undefined} autoAttack
         * @memberof botCraft.AttackAction
         * @instance
         */
        AttackAction.prototype.autoAttack = null;

        /**
         * Creates a new AttackAction instance using the specified properties.
         * @function create
         * @memberof botCraft.AttackAction
         * @static
         * @param {botCraft.IAttackAction=} [properties] Properties to set
         * @returns {botCraft.AttackAction} AttackAction instance
         */
        AttackAction.create = function create(properties) {
            return new AttackAction(properties);
        };

        /**
         * Encodes the specified AttackAction message. Does not implicitly {@link botCraft.AttackAction.verify|verify} messages.
         * @function encode
         * @memberof botCraft.AttackAction
         * @static
         * @param {botCraft.IAttackAction} message AttackAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AttackAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.target != null && Object.hasOwnProperty.call(message, "target"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.target);
            if (message.autoAttack != null && Object.hasOwnProperty.call(message, "autoAttack"))
                $root.botCraft.AutoAttack.encode(message.autoAttack, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AttackAction message, length delimited. Does not implicitly {@link botCraft.AttackAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof botCraft.AttackAction
         * @static
         * @param {botCraft.IAttackAction} message AttackAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AttackAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AttackAction message from the specified reader or buffer.
         * @function decode
         * @memberof botCraft.AttackAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {botCraft.AttackAction} AttackAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AttackAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.botCraft.AttackAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.target = reader.int32();
                    break;
                case 2:
                    message.autoAttack = $root.botCraft.AutoAttack.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AttackAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof botCraft.AttackAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {botCraft.AttackAction} AttackAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AttackAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AttackAction message.
         * @function verify
         * @memberof botCraft.AttackAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AttackAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.target != null && message.hasOwnProperty("target"))
                if (!$util.isInteger(message.target))
                    return "target: integer expected";
            if (message.autoAttack != null && message.hasOwnProperty("autoAttack")) {
                let error = $root.botCraft.AutoAttack.verify(message.autoAttack);
                if (error)
                    return "autoAttack." + error;
            }
            return null;
        };

        /**
         * Creates an AttackAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof botCraft.AttackAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {botCraft.AttackAction} AttackAction
         */
        AttackAction.fromObject = function fromObject(object) {
            if (object instanceof $root.botCraft.AttackAction)
                return object;
            let message = new $root.botCraft.AttackAction();
            if (object.target != null)
                message.target = object.target | 0;
            if (object.autoAttack != null) {
                if (typeof object.autoAttack !== "object")
                    throw TypeError(".botCraft.AttackAction.autoAttack: object expected");
                message.autoAttack = $root.botCraft.AutoAttack.fromObject(object.autoAttack);
            }
            return message;
        };

        /**
         * Creates a plain object from an AttackAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof botCraft.AttackAction
         * @static
         * @param {botCraft.AttackAction} message AttackAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AttackAction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.target = 0;
                object.autoAttack = null;
            }
            if (message.target != null && message.hasOwnProperty("target"))
                object.target = message.target;
            if (message.autoAttack != null && message.hasOwnProperty("autoAttack"))
                object.autoAttack = $root.botCraft.AutoAttack.toObject(message.autoAttack, options);
            return object;
        };

        /**
         * Converts this AttackAction to JSON.
         * @function toJSON
         * @memberof botCraft.AttackAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AttackAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AttackAction;
    })();

    botCraft.AutoAttack = (function() {

        /**
         * Properties of an AutoAttack.
         * @memberof botCraft
         * @interface IAutoAttack
         * @property {number|null} [pathfindRange] AutoAttack pathfindRange
         * @property {Array.<botCraft.EntityType>|null} [validTargets] AutoAttack validTargets
         */

        /**
         * Constructs a new AutoAttack.
         * @memberof botCraft
         * @classdesc Represents an AutoAttack.
         * @implements IAutoAttack
         * @constructor
         * @param {botCraft.IAutoAttack=} [properties] Properties to set
         */
        function AutoAttack(properties) {
            this.validTargets = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AutoAttack pathfindRange.
         * @member {number} pathfindRange
         * @memberof botCraft.AutoAttack
         * @instance
         */
        AutoAttack.prototype.pathfindRange = 0;

        /**
         * AutoAttack validTargets.
         * @member {Array.<botCraft.EntityType>} validTargets
         * @memberof botCraft.AutoAttack
         * @instance
         */
        AutoAttack.prototype.validTargets = $util.emptyArray;

        /**
         * Creates a new AutoAttack instance using the specified properties.
         * @function create
         * @memberof botCraft.AutoAttack
         * @static
         * @param {botCraft.IAutoAttack=} [properties] Properties to set
         * @returns {botCraft.AutoAttack} AutoAttack instance
         */
        AutoAttack.create = function create(properties) {
            return new AutoAttack(properties);
        };

        /**
         * Encodes the specified AutoAttack message. Does not implicitly {@link botCraft.AutoAttack.verify|verify} messages.
         * @function encode
         * @memberof botCraft.AutoAttack
         * @static
         * @param {botCraft.IAutoAttack} message AutoAttack message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AutoAttack.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pathfindRange != null && Object.hasOwnProperty.call(message, "pathfindRange"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.pathfindRange);
            if (message.validTargets != null && message.validTargets.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.validTargets.length; ++i)
                    writer.int32(message.validTargets[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified AutoAttack message, length delimited. Does not implicitly {@link botCraft.AutoAttack.verify|verify} messages.
         * @function encodeDelimited
         * @memberof botCraft.AutoAttack
         * @static
         * @param {botCraft.IAutoAttack} message AutoAttack message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AutoAttack.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AutoAttack message from the specified reader or buffer.
         * @function decode
         * @memberof botCraft.AutoAttack
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {botCraft.AutoAttack} AutoAttack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AutoAttack.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.botCraft.AutoAttack();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.pathfindRange = reader.int32();
                    break;
                case 2:
                    if (!(message.validTargets && message.validTargets.length))
                        message.validTargets = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.validTargets.push(reader.int32());
                    } else
                        message.validTargets.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AutoAttack message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof botCraft.AutoAttack
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {botCraft.AutoAttack} AutoAttack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AutoAttack.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AutoAttack message.
         * @function verify
         * @memberof botCraft.AutoAttack
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AutoAttack.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pathfindRange != null && message.hasOwnProperty("pathfindRange"))
                if (!$util.isInteger(message.pathfindRange))
                    return "pathfindRange: integer expected";
            if (message.validTargets != null && message.hasOwnProperty("validTargets")) {
                if (!Array.isArray(message.validTargets))
                    return "validTargets: array expected";
                for (let i = 0; i < message.validTargets.length; ++i)
                    switch (message.validTargets[i]) {
                    default:
                        return "validTargets: enum value[] expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        break;
                    }
            }
            return null;
        };

        /**
         * Creates an AutoAttack message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof botCraft.AutoAttack
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {botCraft.AutoAttack} AutoAttack
         */
        AutoAttack.fromObject = function fromObject(object) {
            if (object instanceof $root.botCraft.AutoAttack)
                return object;
            let message = new $root.botCraft.AutoAttack();
            if (object.pathfindRange != null)
                message.pathfindRange = object.pathfindRange | 0;
            if (object.validTargets) {
                if (!Array.isArray(object.validTargets))
                    throw TypeError(".botCraft.AutoAttack.validTargets: array expected");
                message.validTargets = [];
                for (let i = 0; i < object.validTargets.length; ++i)
                    switch (object.validTargets[i]) {
                    default:
                    case "WALL":
                    case 0:
                        message.validTargets[i] = 0;
                        break;
                    case "HOUSE":
                    case 1:
                        message.validTargets[i] = 1;
                        break;
                    case "BUILDER_BASE":
                    case 2:
                        message.validTargets[i] = 2;
                        break;
                    case "BUILDER_UNIT":
                    case 3:
                        message.validTargets[i] = 3;
                        break;
                    case "MELEE_BASE":
                    case 4:
                        message.validTargets[i] = 4;
                        break;
                    case "MELEE_UNIT":
                    case 5:
                        message.validTargets[i] = 5;
                        break;
                    case "RANGED_BASE":
                    case 6:
                        message.validTargets[i] = 6;
                        break;
                    case "RANGED_UNIT":
                    case 7:
                        message.validTargets[i] = 7;
                        break;
                    case "RESOURCE":
                    case 8:
                        message.validTargets[i] = 8;
                        break;
                    case "TURRET":
                    case 9:
                        message.validTargets[i] = 9;
                        break;
                    }
            }
            return message;
        };

        /**
         * Creates a plain object from an AutoAttack message. Also converts values to other types if specified.
         * @function toObject
         * @memberof botCraft.AutoAttack
         * @static
         * @param {botCraft.AutoAttack} message AutoAttack
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AutoAttack.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.validTargets = [];
            if (options.defaults)
                object.pathfindRange = 0;
            if (message.pathfindRange != null && message.hasOwnProperty("pathfindRange"))
                object.pathfindRange = message.pathfindRange;
            if (message.validTargets && message.validTargets.length) {
                object.validTargets = [];
                for (let j = 0; j < message.validTargets.length; ++j)
                    object.validTargets[j] = options.enums === String ? $root.botCraft.EntityType[message.validTargets[j]] : message.validTargets[j];
            }
            return object;
        };

        /**
         * Converts this AutoAttack to JSON.
         * @function toJSON
         * @memberof botCraft.AutoAttack
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AutoAttack.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AutoAttack;
    })();

    botCraft.RepairAction = (function() {

        /**
         * Properties of a RepairAction.
         * @memberof botCraft
         * @interface IRepairAction
         * @property {number|null} [targetId] RepairAction targetId
         */

        /**
         * Constructs a new RepairAction.
         * @memberof botCraft
         * @classdesc Represents a RepairAction.
         * @implements IRepairAction
         * @constructor
         * @param {botCraft.IRepairAction=} [properties] Properties to set
         */
        function RepairAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RepairAction targetId.
         * @member {number} targetId
         * @memberof botCraft.RepairAction
         * @instance
         */
        RepairAction.prototype.targetId = 0;

        /**
         * Creates a new RepairAction instance using the specified properties.
         * @function create
         * @memberof botCraft.RepairAction
         * @static
         * @param {botCraft.IRepairAction=} [properties] Properties to set
         * @returns {botCraft.RepairAction} RepairAction instance
         */
        RepairAction.create = function create(properties) {
            return new RepairAction(properties);
        };

        /**
         * Encodes the specified RepairAction message. Does not implicitly {@link botCraft.RepairAction.verify|verify} messages.
         * @function encode
         * @memberof botCraft.RepairAction
         * @static
         * @param {botCraft.IRepairAction} message RepairAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RepairAction.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.targetId != null && Object.hasOwnProperty.call(message, "targetId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.targetId);
            return writer;
        };

        /**
         * Encodes the specified RepairAction message, length delimited. Does not implicitly {@link botCraft.RepairAction.verify|verify} messages.
         * @function encodeDelimited
         * @memberof botCraft.RepairAction
         * @static
         * @param {botCraft.IRepairAction} message RepairAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RepairAction.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RepairAction message from the specified reader or buffer.
         * @function decode
         * @memberof botCraft.RepairAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {botCraft.RepairAction} RepairAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RepairAction.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.botCraft.RepairAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.targetId = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RepairAction message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof botCraft.RepairAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {botCraft.RepairAction} RepairAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RepairAction.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RepairAction message.
         * @function verify
         * @memberof botCraft.RepairAction
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RepairAction.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.targetId != null && message.hasOwnProperty("targetId"))
                if (!$util.isInteger(message.targetId))
                    return "targetId: integer expected";
            return null;
        };

        /**
         * Creates a RepairAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof botCraft.RepairAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {botCraft.RepairAction} RepairAction
         */
        RepairAction.fromObject = function fromObject(object) {
            if (object instanceof $root.botCraft.RepairAction)
                return object;
            let message = new $root.botCraft.RepairAction();
            if (object.targetId != null)
                message.targetId = object.targetId | 0;
            return message;
        };

        /**
         * Creates a plain object from a RepairAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof botCraft.RepairAction
         * @static
         * @param {botCraft.RepairAction} message RepairAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RepairAction.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.targetId = 0;
            if (message.targetId != null && message.hasOwnProperty("targetId"))
                object.targetId = message.targetId;
            return object;
        };

        /**
         * Converts this RepairAction to JSON.
         * @function toJSON
         * @memberof botCraft.RepairAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RepairAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RepairAction;
    })();

    botCraft.Options = (function() {

        /**
         * Properties of an Options.
         * @memberof botCraft
         * @interface IOptions
         * @property {number|null} [mapSize] Options mapSize
         * @property {boolean|null} [fogOfWar] Options fogOfWar
         * @property {number|null} [maxTickCount] Options maxTickCount
         * @property {Array.<botCraft.IEntityProperties>|null} [entityProperties] Options entityProperties
         */

        /**
         * Constructs a new Options.
         * @memberof botCraft
         * @classdesc Represents an Options.
         * @implements IOptions
         * @constructor
         * @param {botCraft.IOptions=} [properties] Properties to set
         */
        function Options(properties) {
            this.entityProperties = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Options mapSize.
         * @member {number} mapSize
         * @memberof botCraft.Options
         * @instance
         */
        Options.prototype.mapSize = 0;

        /**
         * Options fogOfWar.
         * @member {boolean} fogOfWar
         * @memberof botCraft.Options
         * @instance
         */
        Options.prototype.fogOfWar = false;

        /**
         * Options maxTickCount.
         * @member {number} maxTickCount
         * @memberof botCraft.Options
         * @instance
         */
        Options.prototype.maxTickCount = 0;

        /**
         * Options entityProperties.
         * @member {Array.<botCraft.IEntityProperties>} entityProperties
         * @memberof botCraft.Options
         * @instance
         */
        Options.prototype.entityProperties = $util.emptyArray;

        /**
         * Creates a new Options instance using the specified properties.
         * @function create
         * @memberof botCraft.Options
         * @static
         * @param {botCraft.IOptions=} [properties] Properties to set
         * @returns {botCraft.Options} Options instance
         */
        Options.create = function create(properties) {
            return new Options(properties);
        };

        /**
         * Encodes the specified Options message. Does not implicitly {@link botCraft.Options.verify|verify} messages.
         * @function encode
         * @memberof botCraft.Options
         * @static
         * @param {botCraft.IOptions} message Options message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Options.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mapSize != null && Object.hasOwnProperty.call(message, "mapSize"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.mapSize);
            if (message.fogOfWar != null && Object.hasOwnProperty.call(message, "fogOfWar"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.fogOfWar);
            if (message.maxTickCount != null && Object.hasOwnProperty.call(message, "maxTickCount"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.maxTickCount);
            if (message.entityProperties != null && message.entityProperties.length)
                for (let i = 0; i < message.entityProperties.length; ++i)
                    $root.botCraft.EntityProperties.encode(message.entityProperties[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Options message, length delimited. Does not implicitly {@link botCraft.Options.verify|verify} messages.
         * @function encodeDelimited
         * @memberof botCraft.Options
         * @static
         * @param {botCraft.IOptions} message Options message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Options.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Options message from the specified reader or buffer.
         * @function decode
         * @memberof botCraft.Options
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {botCraft.Options} Options
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Options.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.botCraft.Options();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.mapSize = reader.int32();
                    break;
                case 2:
                    message.fogOfWar = reader.bool();
                    break;
                case 3:
                    message.maxTickCount = reader.uint32();
                    break;
                case 4:
                    if (!(message.entityProperties && message.entityProperties.length))
                        message.entityProperties = [];
                    message.entityProperties.push($root.botCraft.EntityProperties.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Options message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof botCraft.Options
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {botCraft.Options} Options
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Options.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Options message.
         * @function verify
         * @memberof botCraft.Options
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Options.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mapSize != null && message.hasOwnProperty("mapSize"))
                if (!$util.isInteger(message.mapSize))
                    return "mapSize: integer expected";
            if (message.fogOfWar != null && message.hasOwnProperty("fogOfWar"))
                if (typeof message.fogOfWar !== "boolean")
                    return "fogOfWar: boolean expected";
            if (message.maxTickCount != null && message.hasOwnProperty("maxTickCount"))
                if (!$util.isInteger(message.maxTickCount))
                    return "maxTickCount: integer expected";
            if (message.entityProperties != null && message.hasOwnProperty("entityProperties")) {
                if (!Array.isArray(message.entityProperties))
                    return "entityProperties: array expected";
                for (let i = 0; i < message.entityProperties.length; ++i) {
                    let error = $root.botCraft.EntityProperties.verify(message.entityProperties[i]);
                    if (error)
                        return "entityProperties." + error;
                }
            }
            return null;
        };

        /**
         * Creates an Options message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof botCraft.Options
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {botCraft.Options} Options
         */
        Options.fromObject = function fromObject(object) {
            if (object instanceof $root.botCraft.Options)
                return object;
            let message = new $root.botCraft.Options();
            if (object.mapSize != null)
                message.mapSize = object.mapSize | 0;
            if (object.fogOfWar != null)
                message.fogOfWar = Boolean(object.fogOfWar);
            if (object.maxTickCount != null)
                message.maxTickCount = object.maxTickCount >>> 0;
            if (object.entityProperties) {
                if (!Array.isArray(object.entityProperties))
                    throw TypeError(".botCraft.Options.entityProperties: array expected");
                message.entityProperties = [];
                for (let i = 0; i < object.entityProperties.length; ++i) {
                    if (typeof object.entityProperties[i] !== "object")
                        throw TypeError(".botCraft.Options.entityProperties: object expected");
                    message.entityProperties[i] = $root.botCraft.EntityProperties.fromObject(object.entityProperties[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an Options message. Also converts values to other types if specified.
         * @function toObject
         * @memberof botCraft.Options
         * @static
         * @param {botCraft.Options} message Options
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Options.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.entityProperties = [];
            if (options.defaults) {
                object.mapSize = 0;
                object.fogOfWar = false;
                object.maxTickCount = 0;
            }
            if (message.mapSize != null && message.hasOwnProperty("mapSize"))
                object.mapSize = message.mapSize;
            if (message.fogOfWar != null && message.hasOwnProperty("fogOfWar"))
                object.fogOfWar = message.fogOfWar;
            if (message.maxTickCount != null && message.hasOwnProperty("maxTickCount"))
                object.maxTickCount = message.maxTickCount;
            if (message.entityProperties && message.entityProperties.length) {
                object.entityProperties = [];
                for (let j = 0; j < message.entityProperties.length; ++j)
                    object.entityProperties[j] = $root.botCraft.EntityProperties.toObject(message.entityProperties[j], options);
            }
            return object;
        };

        /**
         * Converts this Options to JSON.
         * @function toJSON
         * @memberof botCraft.Options
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Options.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Options;
    })();

    /**
     * EntityType enum.
     * @name botCraft.EntityType
     * @enum {number}
     * @property {number} WALL=0 WALL value
     * @property {number} HOUSE=1 HOUSE value
     * @property {number} BUILDER_BASE=2 BUILDER_BASE value
     * @property {number} BUILDER_UNIT=3 BUILDER_UNIT value
     * @property {number} MELEE_BASE=4 MELEE_BASE value
     * @property {number} MELEE_UNIT=5 MELEE_UNIT value
     * @property {number} RANGED_BASE=6 RANGED_BASE value
     * @property {number} RANGED_UNIT=7 RANGED_UNIT value
     * @property {number} RESOURCE=8 RESOURCE value
     * @property {number} TURRET=9 TURRET value
     */
    botCraft.EntityType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "WALL"] = 0;
        values[valuesById[1] = "HOUSE"] = 1;
        values[valuesById[2] = "BUILDER_BASE"] = 2;
        values[valuesById[3] = "BUILDER_UNIT"] = 3;
        values[valuesById[4] = "MELEE_BASE"] = 4;
        values[valuesById[5] = "MELEE_UNIT"] = 5;
        values[valuesById[6] = "RANGED_BASE"] = 6;
        values[valuesById[7] = "RANGED_UNIT"] = 7;
        values[valuesById[8] = "RESOURCE"] = 8;
        values[valuesById[9] = "TURRET"] = 9;
        return values;
    })();

    botCraft.EntityProperties = (function() {

        /**
         * Properties of an EntityProperties.
         * @memberof botCraft
         * @interface IEntityProperties
         * @property {botCraft.EntityType|null} [entityType] EntityProperties entityType
         * @property {number|null} [size] EntityProperties size
         * @property {number|null} [buildScore] EntityProperties buildScore
         * @property {number|null} [destroyScore] EntityProperties destroyScore
         * @property {boolean|null} [canMove] EntityProperties canMove
         * @property {number|null} [populationProvide] EntityProperties populationProvide
         * @property {number|null} [populationUse] EntityProperties populationUse
         * @property {number|null} [maxHealth] EntityProperties maxHealth
         * @property {number|null} [cost] EntityProperties cost
         * @property {number|null} [sightRange] EntityProperties sightRange
         * @property {number|null} [resourcePerHealth] EntityProperties resourcePerHealth
         * @property {botCraft.IBuildProperties|null} [buildProperties] EntityProperties buildProperties
         * @property {botCraft.IAttackProperties|null} [attackProperties] EntityProperties attackProperties
         * @property {botCraft.IRepairProperties|null} [repairProperties] EntityProperties repairProperties
         */

        /**
         * Constructs a new EntityProperties.
         * @memberof botCraft
         * @classdesc Represents an EntityProperties.
         * @implements IEntityProperties
         * @constructor
         * @param {botCraft.IEntityProperties=} [properties] Properties to set
         */
        function EntityProperties(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EntityProperties entityType.
         * @member {botCraft.EntityType} entityType
         * @memberof botCraft.EntityProperties
         * @instance
         */
        EntityProperties.prototype.entityType = 0;

        /**
         * EntityProperties size.
         * @member {number} size
         * @memberof botCraft.EntityProperties
         * @instance
         */
        EntityProperties.prototype.size = 0;

        /**
         * EntityProperties buildScore.
         * @member {number} buildScore
         * @memberof botCraft.EntityProperties
         * @instance
         */
        EntityProperties.prototype.buildScore = 0;

        /**
         * EntityProperties destroyScore.
         * @member {number} destroyScore
         * @memberof botCraft.EntityProperties
         * @instance
         */
        EntityProperties.prototype.destroyScore = 0;

        /**
         * EntityProperties canMove.
         * @member {boolean} canMove
         * @memberof botCraft.EntityProperties
         * @instance
         */
        EntityProperties.prototype.canMove = false;

        /**
         * EntityProperties populationProvide.
         * @member {number} populationProvide
         * @memberof botCraft.EntityProperties
         * @instance
         */
        EntityProperties.prototype.populationProvide = 0;

        /**
         * EntityProperties populationUse.
         * @member {number} populationUse
         * @memberof botCraft.EntityProperties
         * @instance
         */
        EntityProperties.prototype.populationUse = 0;

        /**
         * EntityProperties maxHealth.
         * @member {number} maxHealth
         * @memberof botCraft.EntityProperties
         * @instance
         */
        EntityProperties.prototype.maxHealth = 0;

        /**
         * EntityProperties cost.
         * @member {number} cost
         * @memberof botCraft.EntityProperties
         * @instance
         */
        EntityProperties.prototype.cost = 0;

        /**
         * EntityProperties sightRange.
         * @member {number} sightRange
         * @memberof botCraft.EntityProperties
         * @instance
         */
        EntityProperties.prototype.sightRange = 0;

        /**
         * EntityProperties resourcePerHealth.
         * @member {number} resourcePerHealth
         * @memberof botCraft.EntityProperties
         * @instance
         */
        EntityProperties.prototype.resourcePerHealth = 0;

        /**
         * EntityProperties buildProperties.
         * @member {botCraft.IBuildProperties|null|undefined} buildProperties
         * @memberof botCraft.EntityProperties
         * @instance
         */
        EntityProperties.prototype.buildProperties = null;

        /**
         * EntityProperties attackProperties.
         * @member {botCraft.IAttackProperties|null|undefined} attackProperties
         * @memberof botCraft.EntityProperties
         * @instance
         */
        EntityProperties.prototype.attackProperties = null;

        /**
         * EntityProperties repairProperties.
         * @member {botCraft.IRepairProperties|null|undefined} repairProperties
         * @memberof botCraft.EntityProperties
         * @instance
         */
        EntityProperties.prototype.repairProperties = null;

        /**
         * Creates a new EntityProperties instance using the specified properties.
         * @function create
         * @memberof botCraft.EntityProperties
         * @static
         * @param {botCraft.IEntityProperties=} [properties] Properties to set
         * @returns {botCraft.EntityProperties} EntityProperties instance
         */
        EntityProperties.create = function create(properties) {
            return new EntityProperties(properties);
        };

        /**
         * Encodes the specified EntityProperties message. Does not implicitly {@link botCraft.EntityProperties.verify|verify} messages.
         * @function encode
         * @memberof botCraft.EntityProperties
         * @static
         * @param {botCraft.IEntityProperties} message EntityProperties message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EntityProperties.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.entityType != null && Object.hasOwnProperty.call(message, "entityType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.entityType);
            if (message.size != null && Object.hasOwnProperty.call(message, "size"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.size);
            if (message.buildScore != null && Object.hasOwnProperty.call(message, "buildScore"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.buildScore);
            if (message.destroyScore != null && Object.hasOwnProperty.call(message, "destroyScore"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.destroyScore);
            if (message.canMove != null && Object.hasOwnProperty.call(message, "canMove"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.canMove);
            if (message.populationProvide != null && Object.hasOwnProperty.call(message, "populationProvide"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.populationProvide);
            if (message.populationUse != null && Object.hasOwnProperty.call(message, "populationUse"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.populationUse);
            if (message.maxHealth != null && Object.hasOwnProperty.call(message, "maxHealth"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.maxHealth);
            if (message.cost != null && Object.hasOwnProperty.call(message, "cost"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.cost);
            if (message.sightRange != null && Object.hasOwnProperty.call(message, "sightRange"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.sightRange);
            if (message.resourcePerHealth != null && Object.hasOwnProperty.call(message, "resourcePerHealth"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.resourcePerHealth);
            if (message.buildProperties != null && Object.hasOwnProperty.call(message, "buildProperties"))
                $root.botCraft.BuildProperties.encode(message.buildProperties, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
            if (message.attackProperties != null && Object.hasOwnProperty.call(message, "attackProperties"))
                $root.botCraft.AttackProperties.encode(message.attackProperties, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
            if (message.repairProperties != null && Object.hasOwnProperty.call(message, "repairProperties"))
                $root.botCraft.RepairProperties.encode(message.repairProperties, writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified EntityProperties message, length delimited. Does not implicitly {@link botCraft.EntityProperties.verify|verify} messages.
         * @function encodeDelimited
         * @memberof botCraft.EntityProperties
         * @static
         * @param {botCraft.IEntityProperties} message EntityProperties message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EntityProperties.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EntityProperties message from the specified reader or buffer.
         * @function decode
         * @memberof botCraft.EntityProperties
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {botCraft.EntityProperties} EntityProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EntityProperties.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.botCraft.EntityProperties();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.entityType = reader.int32();
                    break;
                case 2:
                    message.size = reader.int32();
                    break;
                case 3:
                    message.buildScore = reader.int32();
                    break;
                case 4:
                    message.destroyScore = reader.int32();
                    break;
                case 5:
                    message.canMove = reader.bool();
                    break;
                case 6:
                    message.populationProvide = reader.int32();
                    break;
                case 7:
                    message.populationUse = reader.int32();
                    break;
                case 8:
                    message.maxHealth = reader.int32();
                    break;
                case 9:
                    message.cost = reader.int32();
                    break;
                case 10:
                    message.sightRange = reader.int32();
                    break;
                case 11:
                    message.resourcePerHealth = reader.int32();
                    break;
                case 12:
                    message.buildProperties = $root.botCraft.BuildProperties.decode(reader, reader.uint32());
                    break;
                case 13:
                    message.attackProperties = $root.botCraft.AttackProperties.decode(reader, reader.uint32());
                    break;
                case 14:
                    message.repairProperties = $root.botCraft.RepairProperties.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EntityProperties message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof botCraft.EntityProperties
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {botCraft.EntityProperties} EntityProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EntityProperties.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EntityProperties message.
         * @function verify
         * @memberof botCraft.EntityProperties
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EntityProperties.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.entityType != null && message.hasOwnProperty("entityType"))
                switch (message.entityType) {
                default:
                    return "entityType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    break;
                }
            if (message.size != null && message.hasOwnProperty("size"))
                if (!$util.isInteger(message.size))
                    return "size: integer expected";
            if (message.buildScore != null && message.hasOwnProperty("buildScore"))
                if (!$util.isInteger(message.buildScore))
                    return "buildScore: integer expected";
            if (message.destroyScore != null && message.hasOwnProperty("destroyScore"))
                if (!$util.isInteger(message.destroyScore))
                    return "destroyScore: integer expected";
            if (message.canMove != null && message.hasOwnProperty("canMove"))
                if (typeof message.canMove !== "boolean")
                    return "canMove: boolean expected";
            if (message.populationProvide != null && message.hasOwnProperty("populationProvide"))
                if (!$util.isInteger(message.populationProvide))
                    return "populationProvide: integer expected";
            if (message.populationUse != null && message.hasOwnProperty("populationUse"))
                if (!$util.isInteger(message.populationUse))
                    return "populationUse: integer expected";
            if (message.maxHealth != null && message.hasOwnProperty("maxHealth"))
                if (!$util.isInteger(message.maxHealth))
                    return "maxHealth: integer expected";
            if (message.cost != null && message.hasOwnProperty("cost"))
                if (!$util.isInteger(message.cost))
                    return "cost: integer expected";
            if (message.sightRange != null && message.hasOwnProperty("sightRange"))
                if (!$util.isInteger(message.sightRange))
                    return "sightRange: integer expected";
            if (message.resourcePerHealth != null && message.hasOwnProperty("resourcePerHealth"))
                if (!$util.isInteger(message.resourcePerHealth))
                    return "resourcePerHealth: integer expected";
            if (message.buildProperties != null && message.hasOwnProperty("buildProperties")) {
                let error = $root.botCraft.BuildProperties.verify(message.buildProperties);
                if (error)
                    return "buildProperties." + error;
            }
            if (message.attackProperties != null && message.hasOwnProperty("attackProperties")) {
                let error = $root.botCraft.AttackProperties.verify(message.attackProperties);
                if (error)
                    return "attackProperties." + error;
            }
            if (message.repairProperties != null && message.hasOwnProperty("repairProperties")) {
                let error = $root.botCraft.RepairProperties.verify(message.repairProperties);
                if (error)
                    return "repairProperties." + error;
            }
            return null;
        };

        /**
         * Creates an EntityProperties message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof botCraft.EntityProperties
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {botCraft.EntityProperties} EntityProperties
         */
        EntityProperties.fromObject = function fromObject(object) {
            if (object instanceof $root.botCraft.EntityProperties)
                return object;
            let message = new $root.botCraft.EntityProperties();
            switch (object.entityType) {
            case "WALL":
            case 0:
                message.entityType = 0;
                break;
            case "HOUSE":
            case 1:
                message.entityType = 1;
                break;
            case "BUILDER_BASE":
            case 2:
                message.entityType = 2;
                break;
            case "BUILDER_UNIT":
            case 3:
                message.entityType = 3;
                break;
            case "MELEE_BASE":
            case 4:
                message.entityType = 4;
                break;
            case "MELEE_UNIT":
            case 5:
                message.entityType = 5;
                break;
            case "RANGED_BASE":
            case 6:
                message.entityType = 6;
                break;
            case "RANGED_UNIT":
            case 7:
                message.entityType = 7;
                break;
            case "RESOURCE":
            case 8:
                message.entityType = 8;
                break;
            case "TURRET":
            case 9:
                message.entityType = 9;
                break;
            }
            if (object.size != null)
                message.size = object.size | 0;
            if (object.buildScore != null)
                message.buildScore = object.buildScore | 0;
            if (object.destroyScore != null)
                message.destroyScore = object.destroyScore | 0;
            if (object.canMove != null)
                message.canMove = Boolean(object.canMove);
            if (object.populationProvide != null)
                message.populationProvide = object.populationProvide | 0;
            if (object.populationUse != null)
                message.populationUse = object.populationUse | 0;
            if (object.maxHealth != null)
                message.maxHealth = object.maxHealth | 0;
            if (object.cost != null)
                message.cost = object.cost | 0;
            if (object.sightRange != null)
                message.sightRange = object.sightRange | 0;
            if (object.resourcePerHealth != null)
                message.resourcePerHealth = object.resourcePerHealth | 0;
            if (object.buildProperties != null) {
                if (typeof object.buildProperties !== "object")
                    throw TypeError(".botCraft.EntityProperties.buildProperties: object expected");
                message.buildProperties = $root.botCraft.BuildProperties.fromObject(object.buildProperties);
            }
            if (object.attackProperties != null) {
                if (typeof object.attackProperties !== "object")
                    throw TypeError(".botCraft.EntityProperties.attackProperties: object expected");
                message.attackProperties = $root.botCraft.AttackProperties.fromObject(object.attackProperties);
            }
            if (object.repairProperties != null) {
                if (typeof object.repairProperties !== "object")
                    throw TypeError(".botCraft.EntityProperties.repairProperties: object expected");
                message.repairProperties = $root.botCraft.RepairProperties.fromObject(object.repairProperties);
            }
            return message;
        };

        /**
         * Creates a plain object from an EntityProperties message. Also converts values to other types if specified.
         * @function toObject
         * @memberof botCraft.EntityProperties
         * @static
         * @param {botCraft.EntityProperties} message EntityProperties
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EntityProperties.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.entityType = options.enums === String ? "WALL" : 0;
                object.size = 0;
                object.buildScore = 0;
                object.destroyScore = 0;
                object.canMove = false;
                object.populationProvide = 0;
                object.populationUse = 0;
                object.maxHealth = 0;
                object.cost = 0;
                object.sightRange = 0;
                object.resourcePerHealth = 0;
                object.buildProperties = null;
                object.attackProperties = null;
                object.repairProperties = null;
            }
            if (message.entityType != null && message.hasOwnProperty("entityType"))
                object.entityType = options.enums === String ? $root.botCraft.EntityType[message.entityType] : message.entityType;
            if (message.size != null && message.hasOwnProperty("size"))
                object.size = message.size;
            if (message.buildScore != null && message.hasOwnProperty("buildScore"))
                object.buildScore = message.buildScore;
            if (message.destroyScore != null && message.hasOwnProperty("destroyScore"))
                object.destroyScore = message.destroyScore;
            if (message.canMove != null && message.hasOwnProperty("canMove"))
                object.canMove = message.canMove;
            if (message.populationProvide != null && message.hasOwnProperty("populationProvide"))
                object.populationProvide = message.populationProvide;
            if (message.populationUse != null && message.hasOwnProperty("populationUse"))
                object.populationUse = message.populationUse;
            if (message.maxHealth != null && message.hasOwnProperty("maxHealth"))
                object.maxHealth = message.maxHealth;
            if (message.cost != null && message.hasOwnProperty("cost"))
                object.cost = message.cost;
            if (message.sightRange != null && message.hasOwnProperty("sightRange"))
                object.sightRange = message.sightRange;
            if (message.resourcePerHealth != null && message.hasOwnProperty("resourcePerHealth"))
                object.resourcePerHealth = message.resourcePerHealth;
            if (message.buildProperties != null && message.hasOwnProperty("buildProperties"))
                object.buildProperties = $root.botCraft.BuildProperties.toObject(message.buildProperties, options);
            if (message.attackProperties != null && message.hasOwnProperty("attackProperties"))
                object.attackProperties = $root.botCraft.AttackProperties.toObject(message.attackProperties, options);
            if (message.repairProperties != null && message.hasOwnProperty("repairProperties"))
                object.repairProperties = $root.botCraft.RepairProperties.toObject(message.repairProperties, options);
            return object;
        };

        /**
         * Converts this EntityProperties to JSON.
         * @function toJSON
         * @memberof botCraft.EntityProperties
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EntityProperties.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EntityProperties;
    })();

    botCraft.BuildProperties = (function() {

        /**
         * Properties of a BuildProperties.
         * @memberof botCraft
         * @interface IBuildProperties
         * @property {Array.<botCraft.EntityType>|null} [options] BuildProperties options
         * @property {number|null} [initHealth] BuildProperties initHealth
         */

        /**
         * Constructs a new BuildProperties.
         * @memberof botCraft
         * @classdesc Represents a BuildProperties.
         * @implements IBuildProperties
         * @constructor
         * @param {botCraft.IBuildProperties=} [properties] Properties to set
         */
        function BuildProperties(properties) {
            this.options = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BuildProperties options.
         * @member {Array.<botCraft.EntityType>} options
         * @memberof botCraft.BuildProperties
         * @instance
         */
        BuildProperties.prototype.options = $util.emptyArray;

        /**
         * BuildProperties initHealth.
         * @member {number} initHealth
         * @memberof botCraft.BuildProperties
         * @instance
         */
        BuildProperties.prototype.initHealth = 0;

        /**
         * Creates a new BuildProperties instance using the specified properties.
         * @function create
         * @memberof botCraft.BuildProperties
         * @static
         * @param {botCraft.IBuildProperties=} [properties] Properties to set
         * @returns {botCraft.BuildProperties} BuildProperties instance
         */
        BuildProperties.create = function create(properties) {
            return new BuildProperties(properties);
        };

        /**
         * Encodes the specified BuildProperties message. Does not implicitly {@link botCraft.BuildProperties.verify|verify} messages.
         * @function encode
         * @memberof botCraft.BuildProperties
         * @static
         * @param {botCraft.IBuildProperties} message BuildProperties message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BuildProperties.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.options != null && message.options.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.options.length; ++i)
                    writer.int32(message.options[i]);
                writer.ldelim();
            }
            if (message.initHealth != null && Object.hasOwnProperty.call(message, "initHealth"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.initHealth);
            return writer;
        };

        /**
         * Encodes the specified BuildProperties message, length delimited. Does not implicitly {@link botCraft.BuildProperties.verify|verify} messages.
         * @function encodeDelimited
         * @memberof botCraft.BuildProperties
         * @static
         * @param {botCraft.IBuildProperties} message BuildProperties message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BuildProperties.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BuildProperties message from the specified reader or buffer.
         * @function decode
         * @memberof botCraft.BuildProperties
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {botCraft.BuildProperties} BuildProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BuildProperties.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.botCraft.BuildProperties();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.options && message.options.length))
                        message.options = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.options.push(reader.int32());
                    } else
                        message.options.push(reader.int32());
                    break;
                case 2:
                    message.initHealth = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BuildProperties message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof botCraft.BuildProperties
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {botCraft.BuildProperties} BuildProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BuildProperties.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BuildProperties message.
         * @function verify
         * @memberof botCraft.BuildProperties
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BuildProperties.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.options != null && message.hasOwnProperty("options")) {
                if (!Array.isArray(message.options))
                    return "options: array expected";
                for (let i = 0; i < message.options.length; ++i)
                    switch (message.options[i]) {
                    default:
                        return "options: enum value[] expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        break;
                    }
            }
            if (message.initHealth != null && message.hasOwnProperty("initHealth"))
                if (!$util.isInteger(message.initHealth))
                    return "initHealth: integer expected";
            return null;
        };

        /**
         * Creates a BuildProperties message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof botCraft.BuildProperties
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {botCraft.BuildProperties} BuildProperties
         */
        BuildProperties.fromObject = function fromObject(object) {
            if (object instanceof $root.botCraft.BuildProperties)
                return object;
            let message = new $root.botCraft.BuildProperties();
            if (object.options) {
                if (!Array.isArray(object.options))
                    throw TypeError(".botCraft.BuildProperties.options: array expected");
                message.options = [];
                for (let i = 0; i < object.options.length; ++i)
                    switch (object.options[i]) {
                    default:
                    case "WALL":
                    case 0:
                        message.options[i] = 0;
                        break;
                    case "HOUSE":
                    case 1:
                        message.options[i] = 1;
                        break;
                    case "BUILDER_BASE":
                    case 2:
                        message.options[i] = 2;
                        break;
                    case "BUILDER_UNIT":
                    case 3:
                        message.options[i] = 3;
                        break;
                    case "MELEE_BASE":
                    case 4:
                        message.options[i] = 4;
                        break;
                    case "MELEE_UNIT":
                    case 5:
                        message.options[i] = 5;
                        break;
                    case "RANGED_BASE":
                    case 6:
                        message.options[i] = 6;
                        break;
                    case "RANGED_UNIT":
                    case 7:
                        message.options[i] = 7;
                        break;
                    case "RESOURCE":
                    case 8:
                        message.options[i] = 8;
                        break;
                    case "TURRET":
                    case 9:
                        message.options[i] = 9;
                        break;
                    }
            }
            if (object.initHealth != null)
                message.initHealth = object.initHealth | 0;
            return message;
        };

        /**
         * Creates a plain object from a BuildProperties message. Also converts values to other types if specified.
         * @function toObject
         * @memberof botCraft.BuildProperties
         * @static
         * @param {botCraft.BuildProperties} message BuildProperties
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BuildProperties.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.options = [];
            if (options.defaults)
                object.initHealth = 0;
            if (message.options && message.options.length) {
                object.options = [];
                for (let j = 0; j < message.options.length; ++j)
                    object.options[j] = options.enums === String ? $root.botCraft.EntityType[message.options[j]] : message.options[j];
            }
            if (message.initHealth != null && message.hasOwnProperty("initHealth"))
                object.initHealth = message.initHealth;
            return object;
        };

        /**
         * Converts this BuildProperties to JSON.
         * @function toJSON
         * @memberof botCraft.BuildProperties
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BuildProperties.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BuildProperties;
    })();

    botCraft.AttackProperties = (function() {

        /**
         * Properties of an AttackProperties.
         * @memberof botCraft
         * @interface IAttackProperties
         * @property {number|null} [attackRange] AttackProperties attackRange
         * @property {number|null} [damage] AttackProperties damage
         * @property {boolean|null} [collectResource] AttackProperties collectResource
         */

        /**
         * Constructs a new AttackProperties.
         * @memberof botCraft
         * @classdesc Represents an AttackProperties.
         * @implements IAttackProperties
         * @constructor
         * @param {botCraft.IAttackProperties=} [properties] Properties to set
         */
        function AttackProperties(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AttackProperties attackRange.
         * @member {number} attackRange
         * @memberof botCraft.AttackProperties
         * @instance
         */
        AttackProperties.prototype.attackRange = 0;

        /**
         * AttackProperties damage.
         * @member {number} damage
         * @memberof botCraft.AttackProperties
         * @instance
         */
        AttackProperties.prototype.damage = 0;

        /**
         * AttackProperties collectResource.
         * @member {boolean} collectResource
         * @memberof botCraft.AttackProperties
         * @instance
         */
        AttackProperties.prototype.collectResource = false;

        /**
         * Creates a new AttackProperties instance using the specified properties.
         * @function create
         * @memberof botCraft.AttackProperties
         * @static
         * @param {botCraft.IAttackProperties=} [properties] Properties to set
         * @returns {botCraft.AttackProperties} AttackProperties instance
         */
        AttackProperties.create = function create(properties) {
            return new AttackProperties(properties);
        };

        /**
         * Encodes the specified AttackProperties message. Does not implicitly {@link botCraft.AttackProperties.verify|verify} messages.
         * @function encode
         * @memberof botCraft.AttackProperties
         * @static
         * @param {botCraft.IAttackProperties} message AttackProperties message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AttackProperties.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.attackRange != null && Object.hasOwnProperty.call(message, "attackRange"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.attackRange);
            if (message.damage != null && Object.hasOwnProperty.call(message, "damage"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.damage);
            if (message.collectResource != null && Object.hasOwnProperty.call(message, "collectResource"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.collectResource);
            return writer;
        };

        /**
         * Encodes the specified AttackProperties message, length delimited. Does not implicitly {@link botCraft.AttackProperties.verify|verify} messages.
         * @function encodeDelimited
         * @memberof botCraft.AttackProperties
         * @static
         * @param {botCraft.IAttackProperties} message AttackProperties message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AttackProperties.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AttackProperties message from the specified reader or buffer.
         * @function decode
         * @memberof botCraft.AttackProperties
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {botCraft.AttackProperties} AttackProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AttackProperties.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.botCraft.AttackProperties();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.attackRange = reader.int32();
                    break;
                case 2:
                    message.damage = reader.int32();
                    break;
                case 3:
                    message.collectResource = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AttackProperties message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof botCraft.AttackProperties
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {botCraft.AttackProperties} AttackProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AttackProperties.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AttackProperties message.
         * @function verify
         * @memberof botCraft.AttackProperties
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AttackProperties.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.attackRange != null && message.hasOwnProperty("attackRange"))
                if (!$util.isInteger(message.attackRange))
                    return "attackRange: integer expected";
            if (message.damage != null && message.hasOwnProperty("damage"))
                if (!$util.isInteger(message.damage))
                    return "damage: integer expected";
            if (message.collectResource != null && message.hasOwnProperty("collectResource"))
                if (typeof message.collectResource !== "boolean")
                    return "collectResource: boolean expected";
            return null;
        };

        /**
         * Creates an AttackProperties message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof botCraft.AttackProperties
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {botCraft.AttackProperties} AttackProperties
         */
        AttackProperties.fromObject = function fromObject(object) {
            if (object instanceof $root.botCraft.AttackProperties)
                return object;
            let message = new $root.botCraft.AttackProperties();
            if (object.attackRange != null)
                message.attackRange = object.attackRange | 0;
            if (object.damage != null)
                message.damage = object.damage | 0;
            if (object.collectResource != null)
                message.collectResource = Boolean(object.collectResource);
            return message;
        };

        /**
         * Creates a plain object from an AttackProperties message. Also converts values to other types if specified.
         * @function toObject
         * @memberof botCraft.AttackProperties
         * @static
         * @param {botCraft.AttackProperties} message AttackProperties
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AttackProperties.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.attackRange = 0;
                object.damage = 0;
                object.collectResource = false;
            }
            if (message.attackRange != null && message.hasOwnProperty("attackRange"))
                object.attackRange = message.attackRange;
            if (message.damage != null && message.hasOwnProperty("damage"))
                object.damage = message.damage;
            if (message.collectResource != null && message.hasOwnProperty("collectResource"))
                object.collectResource = message.collectResource;
            return object;
        };

        /**
         * Converts this AttackProperties to JSON.
         * @function toJSON
         * @memberof botCraft.AttackProperties
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AttackProperties.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AttackProperties;
    })();

    botCraft.RepairProperties = (function() {

        /**
         * Properties of a RepairProperties.
         * @memberof botCraft
         * @interface IRepairProperties
         * @property {Array.<botCraft.EntityType>|null} [validTargets] RepairProperties validTargets
         * @property {number|null} [power] RepairProperties power
         */

        /**
         * Constructs a new RepairProperties.
         * @memberof botCraft
         * @classdesc Represents a RepairProperties.
         * @implements IRepairProperties
         * @constructor
         * @param {botCraft.IRepairProperties=} [properties] Properties to set
         */
        function RepairProperties(properties) {
            this.validTargets = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RepairProperties validTargets.
         * @member {Array.<botCraft.EntityType>} validTargets
         * @memberof botCraft.RepairProperties
         * @instance
         */
        RepairProperties.prototype.validTargets = $util.emptyArray;

        /**
         * RepairProperties power.
         * @member {number} power
         * @memberof botCraft.RepairProperties
         * @instance
         */
        RepairProperties.prototype.power = 0;

        /**
         * Creates a new RepairProperties instance using the specified properties.
         * @function create
         * @memberof botCraft.RepairProperties
         * @static
         * @param {botCraft.IRepairProperties=} [properties] Properties to set
         * @returns {botCraft.RepairProperties} RepairProperties instance
         */
        RepairProperties.create = function create(properties) {
            return new RepairProperties(properties);
        };

        /**
         * Encodes the specified RepairProperties message. Does not implicitly {@link botCraft.RepairProperties.verify|verify} messages.
         * @function encode
         * @memberof botCraft.RepairProperties
         * @static
         * @param {botCraft.IRepairProperties} message RepairProperties message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RepairProperties.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.validTargets != null && message.validTargets.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.validTargets.length; ++i)
                    writer.int32(message.validTargets[i]);
                writer.ldelim();
            }
            if (message.power != null && Object.hasOwnProperty.call(message, "power"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.power);
            return writer;
        };

        /**
         * Encodes the specified RepairProperties message, length delimited. Does not implicitly {@link botCraft.RepairProperties.verify|verify} messages.
         * @function encodeDelimited
         * @memberof botCraft.RepairProperties
         * @static
         * @param {botCraft.IRepairProperties} message RepairProperties message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RepairProperties.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RepairProperties message from the specified reader or buffer.
         * @function decode
         * @memberof botCraft.RepairProperties
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {botCraft.RepairProperties} RepairProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RepairProperties.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.botCraft.RepairProperties();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.validTargets && message.validTargets.length))
                        message.validTargets = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.validTargets.push(reader.int32());
                    } else
                        message.validTargets.push(reader.int32());
                    break;
                case 2:
                    message.power = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RepairProperties message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof botCraft.RepairProperties
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {botCraft.RepairProperties} RepairProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RepairProperties.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RepairProperties message.
         * @function verify
         * @memberof botCraft.RepairProperties
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RepairProperties.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.validTargets != null && message.hasOwnProperty("validTargets")) {
                if (!Array.isArray(message.validTargets))
                    return "validTargets: array expected";
                for (let i = 0; i < message.validTargets.length; ++i)
                    switch (message.validTargets[i]) {
                    default:
                        return "validTargets: enum value[] expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        break;
                    }
            }
            if (message.power != null && message.hasOwnProperty("power"))
                if (!$util.isInteger(message.power))
                    return "power: integer expected";
            return null;
        };

        /**
         * Creates a RepairProperties message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof botCraft.RepairProperties
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {botCraft.RepairProperties} RepairProperties
         */
        RepairProperties.fromObject = function fromObject(object) {
            if (object instanceof $root.botCraft.RepairProperties)
                return object;
            let message = new $root.botCraft.RepairProperties();
            if (object.validTargets) {
                if (!Array.isArray(object.validTargets))
                    throw TypeError(".botCraft.RepairProperties.validTargets: array expected");
                message.validTargets = [];
                for (let i = 0; i < object.validTargets.length; ++i)
                    switch (object.validTargets[i]) {
                    default:
                    case "WALL":
                    case 0:
                        message.validTargets[i] = 0;
                        break;
                    case "HOUSE":
                    case 1:
                        message.validTargets[i] = 1;
                        break;
                    case "BUILDER_BASE":
                    case 2:
                        message.validTargets[i] = 2;
                        break;
                    case "BUILDER_UNIT":
                    case 3:
                        message.validTargets[i] = 3;
                        break;
                    case "MELEE_BASE":
                    case 4:
                        message.validTargets[i] = 4;
                        break;
                    case "MELEE_UNIT":
                    case 5:
                        message.validTargets[i] = 5;
                        break;
                    case "RANGED_BASE":
                    case 6:
                        message.validTargets[i] = 6;
                        break;
                    case "RANGED_UNIT":
                    case 7:
                        message.validTargets[i] = 7;
                        break;
                    case "RESOURCE":
                    case 8:
                        message.validTargets[i] = 8;
                        break;
                    case "TURRET":
                    case 9:
                        message.validTargets[i] = 9;
                        break;
                    }
            }
            if (object.power != null)
                message.power = object.power | 0;
            return message;
        };

        /**
         * Creates a plain object from a RepairProperties message. Also converts values to other types if specified.
         * @function toObject
         * @memberof botCraft.RepairProperties
         * @static
         * @param {botCraft.RepairProperties} message RepairProperties
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RepairProperties.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.validTargets = [];
            if (options.defaults)
                object.power = 0;
            if (message.validTargets && message.validTargets.length) {
                object.validTargets = [];
                for (let j = 0; j < message.validTargets.length; ++j)
                    object.validTargets[j] = options.enums === String ? $root.botCraft.EntityType[message.validTargets[j]] : message.validTargets[j];
            }
            if (message.power != null && message.hasOwnProperty("power"))
                object.power = message.power;
            return object;
        };

        /**
         * Converts this RepairProperties to JSON.
         * @function toJSON
         * @memberof botCraft.RepairProperties
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RepairProperties.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RepairProperties;
    })();

    botCraft.State = (function() {

        /**
         * Properties of a State.
         * @memberof botCraft
         * @interface IState
         * @property {Array.<botCraft.IEntity>|null} [entities] State entities
         * @property {Array.<botCraft.IPlayer>|null} [players] State players
         * @property {number|null} [nextId] State nextId
         * @property {number|null} [tick] State tick
         */

        /**
         * Constructs a new State.
         * @memberof botCraft
         * @classdesc Represents a State.
         * @implements IState
         * @constructor
         * @param {botCraft.IState=} [properties] Properties to set
         */
        function State(properties) {
            this.entities = [];
            this.players = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * State entities.
         * @member {Array.<botCraft.IEntity>} entities
         * @memberof botCraft.State
         * @instance
         */
        State.prototype.entities = $util.emptyArray;

        /**
         * State players.
         * @member {Array.<botCraft.IPlayer>} players
         * @memberof botCraft.State
         * @instance
         */
        State.prototype.players = $util.emptyArray;

        /**
         * State nextId.
         * @member {number} nextId
         * @memberof botCraft.State
         * @instance
         */
        State.prototype.nextId = 0;

        /**
         * State tick.
         * @member {number} tick
         * @memberof botCraft.State
         * @instance
         */
        State.prototype.tick = 0;

        /**
         * Creates a new State instance using the specified properties.
         * @function create
         * @memberof botCraft.State
         * @static
         * @param {botCraft.IState=} [properties] Properties to set
         * @returns {botCraft.State} State instance
         */
        State.create = function create(properties) {
            return new State(properties);
        };

        /**
         * Encodes the specified State message. Does not implicitly {@link botCraft.State.verify|verify} messages.
         * @function encode
         * @memberof botCraft.State
         * @static
         * @param {botCraft.IState} message State message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        State.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.entities != null && message.entities.length)
                for (let i = 0; i < message.entities.length; ++i)
                    $root.botCraft.Entity.encode(message.entities[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.players != null && message.players.length)
                for (let i = 0; i < message.players.length; ++i)
                    $root.botCraft.Player.encode(message.players[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.nextId != null && Object.hasOwnProperty.call(message, "nextId"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.nextId);
            if (message.tick != null && Object.hasOwnProperty.call(message, "tick"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.tick);
            return writer;
        };

        /**
         * Encodes the specified State message, length delimited. Does not implicitly {@link botCraft.State.verify|verify} messages.
         * @function encodeDelimited
         * @memberof botCraft.State
         * @static
         * @param {botCraft.IState} message State message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        State.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a State message from the specified reader or buffer.
         * @function decode
         * @memberof botCraft.State
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {botCraft.State} State
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        State.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.botCraft.State();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 2:
                    if (!(message.entities && message.entities.length))
                        message.entities = [];
                    message.entities.push($root.botCraft.Entity.decode(reader, reader.uint32()));
                    break;
                case 3:
                    if (!(message.players && message.players.length))
                        message.players = [];
                    message.players.push($root.botCraft.Player.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.nextId = reader.int32();
                    break;
                case 5:
                    message.tick = reader.uint32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a State message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof botCraft.State
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {botCraft.State} State
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        State.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a State message.
         * @function verify
         * @memberof botCraft.State
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        State.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.entities != null && message.hasOwnProperty("entities")) {
                if (!Array.isArray(message.entities))
                    return "entities: array expected";
                for (let i = 0; i < message.entities.length; ++i) {
                    let error = $root.botCraft.Entity.verify(message.entities[i]);
                    if (error)
                        return "entities." + error;
                }
            }
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (let i = 0; i < message.players.length; ++i) {
                    let error = $root.botCraft.Player.verify(message.players[i]);
                    if (error)
                        return "players." + error;
                }
            }
            if (message.nextId != null && message.hasOwnProperty("nextId"))
                if (!$util.isInteger(message.nextId))
                    return "nextId: integer expected";
            if (message.tick != null && message.hasOwnProperty("tick"))
                if (!$util.isInteger(message.tick))
                    return "tick: integer expected";
            return null;
        };

        /**
         * Creates a State message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof botCraft.State
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {botCraft.State} State
         */
        State.fromObject = function fromObject(object) {
            if (object instanceof $root.botCraft.State)
                return object;
            let message = new $root.botCraft.State();
            if (object.entities) {
                if (!Array.isArray(object.entities))
                    throw TypeError(".botCraft.State.entities: array expected");
                message.entities = [];
                for (let i = 0; i < object.entities.length; ++i) {
                    if (typeof object.entities[i] !== "object")
                        throw TypeError(".botCraft.State.entities: object expected");
                    message.entities[i] = $root.botCraft.Entity.fromObject(object.entities[i]);
                }
            }
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".botCraft.State.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i) {
                    if (typeof object.players[i] !== "object")
                        throw TypeError(".botCraft.State.players: object expected");
                    message.players[i] = $root.botCraft.Player.fromObject(object.players[i]);
                }
            }
            if (object.nextId != null)
                message.nextId = object.nextId | 0;
            if (object.tick != null)
                message.tick = object.tick >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a State message. Also converts values to other types if specified.
         * @function toObject
         * @memberof botCraft.State
         * @static
         * @param {botCraft.State} message State
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        State.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.entities = [];
                object.players = [];
            }
            if (options.defaults) {
                object.nextId = 0;
                object.tick = 0;
            }
            if (message.entities && message.entities.length) {
                object.entities = [];
                for (let j = 0; j < message.entities.length; ++j)
                    object.entities[j] = $root.botCraft.Entity.toObject(message.entities[j], options);
            }
            if (message.players && message.players.length) {
                object.players = [];
                for (let j = 0; j < message.players.length; ++j)
                    object.players[j] = $root.botCraft.Player.toObject(message.players[j], options);
            }
            if (message.nextId != null && message.hasOwnProperty("nextId"))
                object.nextId = message.nextId;
            if (message.tick != null && message.hasOwnProperty("tick"))
                object.tick = message.tick;
            return object;
        };

        /**
         * Converts this State to JSON.
         * @function toJSON
         * @memberof botCraft.State
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        State.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return State;
    })();

    botCraft.Player = (function() {

        /**
         * Properties of a Player.
         * @memberof botCraft
         * @interface IPlayer
         * @property {number|null} [id] Player id
         * @property {number|null} [score] Player score
         */

        /**
         * Constructs a new Player.
         * @memberof botCraft
         * @classdesc Represents a Player.
         * @implements IPlayer
         * @constructor
         * @param {botCraft.IPlayer=} [properties] Properties to set
         */
        function Player(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Player id.
         * @member {number} id
         * @memberof botCraft.Player
         * @instance
         */
        Player.prototype.id = 0;

        /**
         * Player score.
         * @member {number} score
         * @memberof botCraft.Player
         * @instance
         */
        Player.prototype.score = 0;

        /**
         * Creates a new Player instance using the specified properties.
         * @function create
         * @memberof botCraft.Player
         * @static
         * @param {botCraft.IPlayer=} [properties] Properties to set
         * @returns {botCraft.Player} Player instance
         */
        Player.create = function create(properties) {
            return new Player(properties);
        };

        /**
         * Encodes the specified Player message. Does not implicitly {@link botCraft.Player.verify|verify} messages.
         * @function encode
         * @memberof botCraft.Player
         * @static
         * @param {botCraft.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Player.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.score != null && Object.hasOwnProperty.call(message, "score"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.score);
            return writer;
        };

        /**
         * Encodes the specified Player message, length delimited. Does not implicitly {@link botCraft.Player.verify|verify} messages.
         * @function encodeDelimited
         * @memberof botCraft.Player
         * @static
         * @param {botCraft.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Player.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @function decode
         * @memberof botCraft.Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {botCraft.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Player.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.botCraft.Player();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.score = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Player message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof botCraft.Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {botCraft.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Player.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Player message.
         * @function verify
         * @memberof botCraft.Player
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Player.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (!$util.isInteger(message.score))
                    return "score: integer expected";
            return null;
        };

        /**
         * Creates a Player message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof botCraft.Player
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {botCraft.Player} Player
         */
        Player.fromObject = function fromObject(object) {
            if (object instanceof $root.botCraft.Player)
                return object;
            let message = new $root.botCraft.Player();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.score != null)
                message.score = object.score | 0;
            return message;
        };

        /**
         * Creates a plain object from a Player message. Also converts values to other types if specified.
         * @function toObject
         * @memberof botCraft.Player
         * @static
         * @param {botCraft.Player} message Player
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Player.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.score = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.score != null && message.hasOwnProperty("score"))
                object.score = message.score;
            return object;
        };

        /**
         * Converts this Player to JSON.
         * @function toJSON
         * @memberof botCraft.Player
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Player.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Player;
    })();

    botCraft.Point2D = (function() {

        /**
         * Properties of a Point2D.
         * @memberof botCraft
         * @interface IPoint2D
         * @property {number|null} [x] Point2D x
         * @property {number|null} [y] Point2D y
         */

        /**
         * Constructs a new Point2D.
         * @memberof botCraft
         * @classdesc Represents a Point2D.
         * @implements IPoint2D
         * @constructor
         * @param {botCraft.IPoint2D=} [properties] Properties to set
         */
        function Point2D(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Point2D x.
         * @member {number} x
         * @memberof botCraft.Point2D
         * @instance
         */
        Point2D.prototype.x = 0;

        /**
         * Point2D y.
         * @member {number} y
         * @memberof botCraft.Point2D
         * @instance
         */
        Point2D.prototype.y = 0;

        /**
         * Creates a new Point2D instance using the specified properties.
         * @function create
         * @memberof botCraft.Point2D
         * @static
         * @param {botCraft.IPoint2D=} [properties] Properties to set
         * @returns {botCraft.Point2D} Point2D instance
         */
        Point2D.create = function create(properties) {
            return new Point2D(properties);
        };

        /**
         * Encodes the specified Point2D message. Does not implicitly {@link botCraft.Point2D.verify|verify} messages.
         * @function encode
         * @memberof botCraft.Point2D
         * @static
         * @param {botCraft.IPoint2D} message Point2D message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Point2D.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.y);
            return writer;
        };

        /**
         * Encodes the specified Point2D message, length delimited. Does not implicitly {@link botCraft.Point2D.verify|verify} messages.
         * @function encodeDelimited
         * @memberof botCraft.Point2D
         * @static
         * @param {botCraft.IPoint2D} message Point2D message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Point2D.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Point2D message from the specified reader or buffer.
         * @function decode
         * @memberof botCraft.Point2D
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {botCraft.Point2D} Point2D
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Point2D.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.botCraft.Point2D();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.x = reader.int32();
                    break;
                case 2:
                    message.y = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Point2D message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof botCraft.Point2D
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {botCraft.Point2D} Point2D
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Point2D.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Point2D message.
         * @function verify
         * @memberof botCraft.Point2D
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Point2D.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.x != null && message.hasOwnProperty("x"))
                if (!$util.isInteger(message.x))
                    return "x: integer expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (!$util.isInteger(message.y))
                    return "y: integer expected";
            return null;
        };

        /**
         * Creates a Point2D message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof botCraft.Point2D
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {botCraft.Point2D} Point2D
         */
        Point2D.fromObject = function fromObject(object) {
            if (object instanceof $root.botCraft.Point2D)
                return object;
            let message = new $root.botCraft.Point2D();
            if (object.x != null)
                message.x = object.x | 0;
            if (object.y != null)
                message.y = object.y | 0;
            return message;
        };

        /**
         * Creates a plain object from a Point2D message. Also converts values to other types if specified.
         * @function toObject
         * @memberof botCraft.Point2D
         * @static
         * @param {botCraft.Point2D} message Point2D
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Point2D.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = message.y;
            return object;
        };

        /**
         * Converts this Point2D to JSON.
         * @function toJSON
         * @memberof botCraft.Point2D
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Point2D.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Point2D;
    })();

    botCraft.Entity = (function() {

        /**
         * Properties of an Entity.
         * @memberof botCraft
         * @interface IEntity
         * @property {number|null} [id] Entity id
         * @property {number|null} [playerId] Entity playerId
         * @property {botCraft.EntityType|null} [entityType] Entity entityType
         * @property {number|null} [health] Entity health
         * @property {botCraft.IPoint2D|null} [position] Entity position
         */

        /**
         * Constructs a new Entity.
         * @memberof botCraft
         * @classdesc Represents an Entity.
         * @implements IEntity
         * @constructor
         * @param {botCraft.IEntity=} [properties] Properties to set
         */
        function Entity(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Entity id.
         * @member {number} id
         * @memberof botCraft.Entity
         * @instance
         */
        Entity.prototype.id = 0;

        /**
         * Entity playerId.
         * @member {number} playerId
         * @memberof botCraft.Entity
         * @instance
         */
        Entity.prototype.playerId = 0;

        /**
         * Entity entityType.
         * @member {botCraft.EntityType} entityType
         * @memberof botCraft.Entity
         * @instance
         */
        Entity.prototype.entityType = 0;

        /**
         * Entity health.
         * @member {number} health
         * @memberof botCraft.Entity
         * @instance
         */
        Entity.prototype.health = 0;

        /**
         * Entity position.
         * @member {botCraft.IPoint2D|null|undefined} position
         * @memberof botCraft.Entity
         * @instance
         */
        Entity.prototype.position = null;

        /**
         * Creates a new Entity instance using the specified properties.
         * @function create
         * @memberof botCraft.Entity
         * @static
         * @param {botCraft.IEntity=} [properties] Properties to set
         * @returns {botCraft.Entity} Entity instance
         */
        Entity.create = function create(properties) {
            return new Entity(properties);
        };

        /**
         * Encodes the specified Entity message. Does not implicitly {@link botCraft.Entity.verify|verify} messages.
         * @function encode
         * @memberof botCraft.Entity
         * @static
         * @param {botCraft.IEntity} message Entity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Entity.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.playerId != null && Object.hasOwnProperty.call(message, "playerId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.playerId);
            if (message.entityType != null && Object.hasOwnProperty.call(message, "entityType"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.entityType);
            if (message.health != null && Object.hasOwnProperty.call(message, "health"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.health);
            if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                $root.botCraft.Point2D.encode(message.position, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Entity message, length delimited. Does not implicitly {@link botCraft.Entity.verify|verify} messages.
         * @function encodeDelimited
         * @memberof botCraft.Entity
         * @static
         * @param {botCraft.IEntity} message Entity message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Entity.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Entity message from the specified reader or buffer.
         * @function decode
         * @memberof botCraft.Entity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {botCraft.Entity} Entity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Entity.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.botCraft.Entity();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.playerId = reader.int32();
                    break;
                case 3:
                    message.entityType = reader.int32();
                    break;
                case 4:
                    message.health = reader.int32();
                    break;
                case 5:
                    message.position = $root.botCraft.Point2D.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an Entity message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof botCraft.Entity
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {botCraft.Entity} Entity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Entity.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Entity message.
         * @function verify
         * @memberof botCraft.Entity
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Entity.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (!$util.isInteger(message.playerId))
                    return "playerId: integer expected";
            if (message.entityType != null && message.hasOwnProperty("entityType"))
                switch (message.entityType) {
                default:
                    return "entityType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    break;
                }
            if (message.health != null && message.hasOwnProperty("health"))
                if (!$util.isInteger(message.health))
                    return "health: integer expected";
            if (message.position != null && message.hasOwnProperty("position")) {
                let error = $root.botCraft.Point2D.verify(message.position);
                if (error)
                    return "position." + error;
            }
            return null;
        };

        /**
         * Creates an Entity message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof botCraft.Entity
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {botCraft.Entity} Entity
         */
        Entity.fromObject = function fromObject(object) {
            if (object instanceof $root.botCraft.Entity)
                return object;
            let message = new $root.botCraft.Entity();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.playerId != null)
                message.playerId = object.playerId | 0;
            switch (object.entityType) {
            case "WALL":
            case 0:
                message.entityType = 0;
                break;
            case "HOUSE":
            case 1:
                message.entityType = 1;
                break;
            case "BUILDER_BASE":
            case 2:
                message.entityType = 2;
                break;
            case "BUILDER_UNIT":
            case 3:
                message.entityType = 3;
                break;
            case "MELEE_BASE":
            case 4:
                message.entityType = 4;
                break;
            case "MELEE_UNIT":
            case 5:
                message.entityType = 5;
                break;
            case "RANGED_BASE":
            case 6:
                message.entityType = 6;
                break;
            case "RANGED_UNIT":
            case 7:
                message.entityType = 7;
                break;
            case "RESOURCE":
            case 8:
                message.entityType = 8;
                break;
            case "TURRET":
            case 9:
                message.entityType = 9;
                break;
            }
            if (object.health != null)
                message.health = object.health | 0;
            if (object.position != null) {
                if (typeof object.position !== "object")
                    throw TypeError(".botCraft.Entity.position: object expected");
                message.position = $root.botCraft.Point2D.fromObject(object.position);
            }
            return message;
        };

        /**
         * Creates a plain object from an Entity message. Also converts values to other types if specified.
         * @function toObject
         * @memberof botCraft.Entity
         * @static
         * @param {botCraft.Entity} message Entity
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Entity.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.playerId = 0;
                object.entityType = options.enums === String ? "WALL" : 0;
                object.health = 0;
                object.position = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                object.playerId = message.playerId;
            if (message.entityType != null && message.hasOwnProperty("entityType"))
                object.entityType = options.enums === String ? $root.botCraft.EntityType[message.entityType] : message.entityType;
            if (message.health != null && message.hasOwnProperty("health"))
                object.health = message.health;
            if (message.position != null && message.hasOwnProperty("position"))
                object.position = $root.botCraft.Point2D.toObject(message.position, options);
            return object;
        };

        /**
         * Converts this Entity to JSON.
         * @function toJSON
         * @memberof botCraft.Entity
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Entity.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Entity;
    })();

    return botCraft;
})();

export { $root as default };
