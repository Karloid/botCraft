import * as $protobuf from "protobufjs";
/** Namespace botCraft. */
export namespace botCraft {

    /** Properties of an Action. */
    interface IAction {

        /** Action entityActions */
        entityActions?: ({ [k: string]: botCraft.IEntityAction }|null);
    }

    /** Represents an Action. */
    class Action implements IAction {

        /**
         * Constructs a new Action.
         * @param [properties] Properties to set
         */
        constructor(properties?: botCraft.IAction);

        /** Action entityActions. */
        public entityActions: { [k: string]: botCraft.IEntityAction };

        /**
         * Creates a new Action instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Action instance
         */
        public static create(properties?: botCraft.IAction): botCraft.Action;

        /**
         * Encodes the specified Action message. Does not implicitly {@link botCraft.Action.verify|verify} messages.
         * @param message Action message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: botCraft.IAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Action message, length delimited. Does not implicitly {@link botCraft.Action.verify|verify} messages.
         * @param message Action message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: botCraft.IAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Action message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Action
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): botCraft.Action;

        /**
         * Decodes an Action message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Action
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): botCraft.Action;

        /**
         * Verifies an Action message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Action message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Action
         */
        public static fromObject(object: { [k: string]: any }): botCraft.Action;

        /**
         * Creates a plain object from an Action message. Also converts values to other types if specified.
         * @param message Action
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: botCraft.Action, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Action to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EntityAction. */
    interface IEntityAction {

        /** EntityAction moveAction */
        moveAction?: (botCraft.IMoveAction|null);

        /** EntityAction buildAction */
        buildAction?: (botCraft.IBuildAction|null);

        /** EntityAction attackAction */
        attackAction?: (botCraft.IAttackAction|null);

        /** EntityAction repairAction */
        repairAction?: (botCraft.IRepairAction|null);
    }

    /** Represents an EntityAction. */
    class EntityAction implements IEntityAction {

        /**
         * Constructs a new EntityAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: botCraft.IEntityAction);

        /** EntityAction moveAction. */
        public moveAction?: (botCraft.IMoveAction|null);

        /** EntityAction buildAction. */
        public buildAction?: (botCraft.IBuildAction|null);

        /** EntityAction attackAction. */
        public attackAction?: (botCraft.IAttackAction|null);

        /** EntityAction repairAction. */
        public repairAction?: (botCraft.IRepairAction|null);

        /**
         * Creates a new EntityAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EntityAction instance
         */
        public static create(properties?: botCraft.IEntityAction): botCraft.EntityAction;

        /**
         * Encodes the specified EntityAction message. Does not implicitly {@link botCraft.EntityAction.verify|verify} messages.
         * @param message EntityAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: botCraft.IEntityAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EntityAction message, length delimited. Does not implicitly {@link botCraft.EntityAction.verify|verify} messages.
         * @param message EntityAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: botCraft.IEntityAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EntityAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EntityAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): botCraft.EntityAction;

        /**
         * Decodes an EntityAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EntityAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): botCraft.EntityAction;

        /**
         * Verifies an EntityAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EntityAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EntityAction
         */
        public static fromObject(object: { [k: string]: any }): botCraft.EntityAction;

        /**
         * Creates a plain object from an EntityAction message. Also converts values to other types if specified.
         * @param message EntityAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: botCraft.EntityAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EntityAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MoveAction. */
    interface IMoveAction {

        /** MoveAction target */
        target?: (botCraft.IPoint2D|null);

        /** MoveAction findClosestPosition */
        findClosestPosition?: (boolean|null);

        /** MoveAction breakThrough */
        breakThrough?: (boolean|null);
    }

    /** Represents a MoveAction. */
    class MoveAction implements IMoveAction {

        /**
         * Constructs a new MoveAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: botCraft.IMoveAction);

        /** MoveAction target. */
        public target?: (botCraft.IPoint2D|null);

        /** MoveAction findClosestPosition. */
        public findClosestPosition: boolean;

        /** MoveAction breakThrough. */
        public breakThrough: boolean;

        /**
         * Creates a new MoveAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MoveAction instance
         */
        public static create(properties?: botCraft.IMoveAction): botCraft.MoveAction;

        /**
         * Encodes the specified MoveAction message. Does not implicitly {@link botCraft.MoveAction.verify|verify} messages.
         * @param message MoveAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: botCraft.IMoveAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MoveAction message, length delimited. Does not implicitly {@link botCraft.MoveAction.verify|verify} messages.
         * @param message MoveAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: botCraft.IMoveAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MoveAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MoveAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): botCraft.MoveAction;

        /**
         * Decodes a MoveAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MoveAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): botCraft.MoveAction;

        /**
         * Verifies a MoveAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MoveAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MoveAction
         */
        public static fromObject(object: { [k: string]: any }): botCraft.MoveAction;

        /**
         * Creates a plain object from a MoveAction message. Also converts values to other types if specified.
         * @param message MoveAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: botCraft.MoveAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MoveAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BuildAction. */
    interface IBuildAction {

        /** BuildAction entityType */
        entityType?: (botCraft.EntityType|null);

        /** BuildAction position */
        position?: (botCraft.IPoint2D|null);
    }

    /** Represents a BuildAction. */
    class BuildAction implements IBuildAction {

        /**
         * Constructs a new BuildAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: botCraft.IBuildAction);

        /** BuildAction entityType. */
        public entityType: botCraft.EntityType;

        /** BuildAction position. */
        public position?: (botCraft.IPoint2D|null);

        /**
         * Creates a new BuildAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BuildAction instance
         */
        public static create(properties?: botCraft.IBuildAction): botCraft.BuildAction;

        /**
         * Encodes the specified BuildAction message. Does not implicitly {@link botCraft.BuildAction.verify|verify} messages.
         * @param message BuildAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: botCraft.IBuildAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BuildAction message, length delimited. Does not implicitly {@link botCraft.BuildAction.verify|verify} messages.
         * @param message BuildAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: botCraft.IBuildAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BuildAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BuildAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): botCraft.BuildAction;

        /**
         * Decodes a BuildAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BuildAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): botCraft.BuildAction;

        /**
         * Verifies a BuildAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BuildAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BuildAction
         */
        public static fromObject(object: { [k: string]: any }): botCraft.BuildAction;

        /**
         * Creates a plain object from a BuildAction message. Also converts values to other types if specified.
         * @param message BuildAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: botCraft.BuildAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BuildAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AttackAction. */
    interface IAttackAction {

        /** AttackAction target */
        target?: (number|null);

        /** AttackAction autoAttack */
        autoAttack?: (botCraft.IAutoAttack|null);
    }

    /** Represents an AttackAction. */
    class AttackAction implements IAttackAction {

        /**
         * Constructs a new AttackAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: botCraft.IAttackAction);

        /** AttackAction target. */
        public target: number;

        /** AttackAction autoAttack. */
        public autoAttack?: (botCraft.IAutoAttack|null);

        /**
         * Creates a new AttackAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AttackAction instance
         */
        public static create(properties?: botCraft.IAttackAction): botCraft.AttackAction;

        /**
         * Encodes the specified AttackAction message. Does not implicitly {@link botCraft.AttackAction.verify|verify} messages.
         * @param message AttackAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: botCraft.IAttackAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AttackAction message, length delimited. Does not implicitly {@link botCraft.AttackAction.verify|verify} messages.
         * @param message AttackAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: botCraft.IAttackAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AttackAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AttackAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): botCraft.AttackAction;

        /**
         * Decodes an AttackAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AttackAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): botCraft.AttackAction;

        /**
         * Verifies an AttackAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AttackAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AttackAction
         */
        public static fromObject(object: { [k: string]: any }): botCraft.AttackAction;

        /**
         * Creates a plain object from an AttackAction message. Also converts values to other types if specified.
         * @param message AttackAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: botCraft.AttackAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AttackAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AutoAttack. */
    interface IAutoAttack {

        /** AutoAttack pathfindRange */
        pathfindRange?: (number|null);

        /** AutoAttack validTargets */
        validTargets?: (botCraft.EntityType[]|null);
    }

    /** Represents an AutoAttack. */
    class AutoAttack implements IAutoAttack {

        /**
         * Constructs a new AutoAttack.
         * @param [properties] Properties to set
         */
        constructor(properties?: botCraft.IAutoAttack);

        /** AutoAttack pathfindRange. */
        public pathfindRange: number;

        /** AutoAttack validTargets. */
        public validTargets: botCraft.EntityType[];

        /**
         * Creates a new AutoAttack instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AutoAttack instance
         */
        public static create(properties?: botCraft.IAutoAttack): botCraft.AutoAttack;

        /**
         * Encodes the specified AutoAttack message. Does not implicitly {@link botCraft.AutoAttack.verify|verify} messages.
         * @param message AutoAttack message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: botCraft.IAutoAttack, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AutoAttack message, length delimited. Does not implicitly {@link botCraft.AutoAttack.verify|verify} messages.
         * @param message AutoAttack message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: botCraft.IAutoAttack, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AutoAttack message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AutoAttack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): botCraft.AutoAttack;

        /**
         * Decodes an AutoAttack message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AutoAttack
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): botCraft.AutoAttack;

        /**
         * Verifies an AutoAttack message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AutoAttack message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AutoAttack
         */
        public static fromObject(object: { [k: string]: any }): botCraft.AutoAttack;

        /**
         * Creates a plain object from an AutoAttack message. Also converts values to other types if specified.
         * @param message AutoAttack
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: botCraft.AutoAttack, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AutoAttack to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RepairAction. */
    interface IRepairAction {

        /** RepairAction targetId */
        targetId?: (number|null);
    }

    /** Represents a RepairAction. */
    class RepairAction implements IRepairAction {

        /**
         * Constructs a new RepairAction.
         * @param [properties] Properties to set
         */
        constructor(properties?: botCraft.IRepairAction);

        /** RepairAction targetId. */
        public targetId: number;

        /**
         * Creates a new RepairAction instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RepairAction instance
         */
        public static create(properties?: botCraft.IRepairAction): botCraft.RepairAction;

        /**
         * Encodes the specified RepairAction message. Does not implicitly {@link botCraft.RepairAction.verify|verify} messages.
         * @param message RepairAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: botCraft.IRepairAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RepairAction message, length delimited. Does not implicitly {@link botCraft.RepairAction.verify|verify} messages.
         * @param message RepairAction message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: botCraft.IRepairAction, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RepairAction message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RepairAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): botCraft.RepairAction;

        /**
         * Decodes a RepairAction message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RepairAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): botCraft.RepairAction;

        /**
         * Verifies a RepairAction message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RepairAction message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RepairAction
         */
        public static fromObject(object: { [k: string]: any }): botCraft.RepairAction;

        /**
         * Creates a plain object from a RepairAction message. Also converts values to other types if specified.
         * @param message RepairAction
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: botCraft.RepairAction, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RepairAction to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Options. */
    interface IOptions {

        /** Options mapSize */
        mapSize?: (number|null);

        /** Options fogOfWar */
        fogOfWar?: (boolean|null);

        /** Options maxTickCount */
        maxTickCount?: (number|null);

        /** Options entityProperties */
        entityProperties?: (botCraft.IEntityProperties[]|null);
    }

    /** Represents an Options. */
    class Options implements IOptions {

        /**
         * Constructs a new Options.
         * @param [properties] Properties to set
         */
        constructor(properties?: botCraft.IOptions);

        /** Options mapSize. */
        public mapSize: number;

        /** Options fogOfWar. */
        public fogOfWar: boolean;

        /** Options maxTickCount. */
        public maxTickCount: number;

        /** Options entityProperties. */
        public entityProperties: botCraft.IEntityProperties[];

        /**
         * Creates a new Options instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Options instance
         */
        public static create(properties?: botCraft.IOptions): botCraft.Options;

        /**
         * Encodes the specified Options message. Does not implicitly {@link botCraft.Options.verify|verify} messages.
         * @param message Options message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: botCraft.IOptions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Options message, length delimited. Does not implicitly {@link botCraft.Options.verify|verify} messages.
         * @param message Options message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: botCraft.IOptions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Options message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Options
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): botCraft.Options;

        /**
         * Decodes an Options message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Options
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): botCraft.Options;

        /**
         * Verifies an Options message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Options message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Options
         */
        public static fromObject(object: { [k: string]: any }): botCraft.Options;

        /**
         * Creates a plain object from an Options message. Also converts values to other types if specified.
         * @param message Options
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: botCraft.Options, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Options to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** EntityType enum. */
    enum EntityType {
        WALL = 0,
        HOUSE = 1,
        BUILDER_BASE = 2,
        BUILDER_UNIT = 3,
        MELEE_BASE = 4,
        MELEE_UNIT = 5,
        RANGED_BASE = 6,
        RANGED_UNIT = 7,
        RESOURCE = 8,
        TURRET = 9
    }

    /** Properties of an EntityProperties. */
    interface IEntityProperties {

        /** EntityProperties entityType */
        entityType?: (botCraft.EntityType|null);

        /** EntityProperties size */
        size?: (number|null);

        /** EntityProperties buildScore */
        buildScore?: (number|null);

        /** EntityProperties destroyScore */
        destroyScore?: (number|null);

        /** EntityProperties canMove */
        canMove?: (boolean|null);

        /** EntityProperties populationProvide */
        populationProvide?: (number|null);

        /** EntityProperties populationUse */
        populationUse?: (number|null);

        /** EntityProperties maxHealth */
        maxHealth?: (number|null);

        /** EntityProperties cost */
        cost?: (number|null);

        /** EntityProperties sightRange */
        sightRange?: (number|null);

        /** EntityProperties resourcePerHealth */
        resourcePerHealth?: (number|null);

        /** EntityProperties buildProperties */
        buildProperties?: (botCraft.IBuildProperties|null);

        /** EntityProperties attackProperties */
        attackProperties?: (botCraft.IAttackProperties|null);

        /** EntityProperties repairProperties */
        repairProperties?: (botCraft.IRepairProperties|null);
    }

    /** Represents an EntityProperties. */
    class EntityProperties implements IEntityProperties {

        /**
         * Constructs a new EntityProperties.
         * @param [properties] Properties to set
         */
        constructor(properties?: botCraft.IEntityProperties);

        /** EntityProperties entityType. */
        public entityType: botCraft.EntityType;

        /** EntityProperties size. */
        public size: number;

        /** EntityProperties buildScore. */
        public buildScore: number;

        /** EntityProperties destroyScore. */
        public destroyScore: number;

        /** EntityProperties canMove. */
        public canMove: boolean;

        /** EntityProperties populationProvide. */
        public populationProvide: number;

        /** EntityProperties populationUse. */
        public populationUse: number;

        /** EntityProperties maxHealth. */
        public maxHealth: number;

        /** EntityProperties cost. */
        public cost: number;

        /** EntityProperties sightRange. */
        public sightRange: number;

        /** EntityProperties resourcePerHealth. */
        public resourcePerHealth: number;

        /** EntityProperties buildProperties. */
        public buildProperties?: (botCraft.IBuildProperties|null);

        /** EntityProperties attackProperties. */
        public attackProperties?: (botCraft.IAttackProperties|null);

        /** EntityProperties repairProperties. */
        public repairProperties?: (botCraft.IRepairProperties|null);

        /**
         * Creates a new EntityProperties instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EntityProperties instance
         */
        public static create(properties?: botCraft.IEntityProperties): botCraft.EntityProperties;

        /**
         * Encodes the specified EntityProperties message. Does not implicitly {@link botCraft.EntityProperties.verify|verify} messages.
         * @param message EntityProperties message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: botCraft.IEntityProperties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EntityProperties message, length delimited. Does not implicitly {@link botCraft.EntityProperties.verify|verify} messages.
         * @param message EntityProperties message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: botCraft.IEntityProperties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EntityProperties message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EntityProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): botCraft.EntityProperties;

        /**
         * Decodes an EntityProperties message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EntityProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): botCraft.EntityProperties;

        /**
         * Verifies an EntityProperties message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EntityProperties message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EntityProperties
         */
        public static fromObject(object: { [k: string]: any }): botCraft.EntityProperties;

        /**
         * Creates a plain object from an EntityProperties message. Also converts values to other types if specified.
         * @param message EntityProperties
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: botCraft.EntityProperties, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EntityProperties to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BuildProperties. */
    interface IBuildProperties {

        /** BuildProperties options */
        options?: (botCraft.EntityType[]|null);

        /** BuildProperties initHealth */
        initHealth?: (number|null);
    }

    /** Represents a BuildProperties. */
    class BuildProperties implements IBuildProperties {

        /**
         * Constructs a new BuildProperties.
         * @param [properties] Properties to set
         */
        constructor(properties?: botCraft.IBuildProperties);

        /** BuildProperties options. */
        public options: botCraft.EntityType[];

        /** BuildProperties initHealth. */
        public initHealth: number;

        /**
         * Creates a new BuildProperties instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BuildProperties instance
         */
        public static create(properties?: botCraft.IBuildProperties): botCraft.BuildProperties;

        /**
         * Encodes the specified BuildProperties message. Does not implicitly {@link botCraft.BuildProperties.verify|verify} messages.
         * @param message BuildProperties message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: botCraft.IBuildProperties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BuildProperties message, length delimited. Does not implicitly {@link botCraft.BuildProperties.verify|verify} messages.
         * @param message BuildProperties message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: botCraft.IBuildProperties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BuildProperties message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BuildProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): botCraft.BuildProperties;

        /**
         * Decodes a BuildProperties message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BuildProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): botCraft.BuildProperties;

        /**
         * Verifies a BuildProperties message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BuildProperties message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BuildProperties
         */
        public static fromObject(object: { [k: string]: any }): botCraft.BuildProperties;

        /**
         * Creates a plain object from a BuildProperties message. Also converts values to other types if specified.
         * @param message BuildProperties
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: botCraft.BuildProperties, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BuildProperties to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AttackProperties. */
    interface IAttackProperties {

        /** AttackProperties attackRange */
        attackRange?: (number|null);

        /** AttackProperties damage */
        damage?: (number|null);

        /** AttackProperties collectResource */
        collectResource?: (boolean|null);
    }

    /** Represents an AttackProperties. */
    class AttackProperties implements IAttackProperties {

        /**
         * Constructs a new AttackProperties.
         * @param [properties] Properties to set
         */
        constructor(properties?: botCraft.IAttackProperties);

        /** AttackProperties attackRange. */
        public attackRange: number;

        /** AttackProperties damage. */
        public damage: number;

        /** AttackProperties collectResource. */
        public collectResource: boolean;

        /**
         * Creates a new AttackProperties instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AttackProperties instance
         */
        public static create(properties?: botCraft.IAttackProperties): botCraft.AttackProperties;

        /**
         * Encodes the specified AttackProperties message. Does not implicitly {@link botCraft.AttackProperties.verify|verify} messages.
         * @param message AttackProperties message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: botCraft.IAttackProperties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AttackProperties message, length delimited. Does not implicitly {@link botCraft.AttackProperties.verify|verify} messages.
         * @param message AttackProperties message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: botCraft.IAttackProperties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AttackProperties message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AttackProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): botCraft.AttackProperties;

        /**
         * Decodes an AttackProperties message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AttackProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): botCraft.AttackProperties;

        /**
         * Verifies an AttackProperties message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AttackProperties message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AttackProperties
         */
        public static fromObject(object: { [k: string]: any }): botCraft.AttackProperties;

        /**
         * Creates a plain object from an AttackProperties message. Also converts values to other types if specified.
         * @param message AttackProperties
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: botCraft.AttackProperties, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AttackProperties to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RepairProperties. */
    interface IRepairProperties {

        /** RepairProperties validTargets */
        validTargets?: (botCraft.EntityType[]|null);

        /** RepairProperties power */
        power?: (number|null);
    }

    /** Represents a RepairProperties. */
    class RepairProperties implements IRepairProperties {

        /**
         * Constructs a new RepairProperties.
         * @param [properties] Properties to set
         */
        constructor(properties?: botCraft.IRepairProperties);

        /** RepairProperties validTargets. */
        public validTargets: botCraft.EntityType[];

        /** RepairProperties power. */
        public power: number;

        /**
         * Creates a new RepairProperties instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RepairProperties instance
         */
        public static create(properties?: botCraft.IRepairProperties): botCraft.RepairProperties;

        /**
         * Encodes the specified RepairProperties message. Does not implicitly {@link botCraft.RepairProperties.verify|verify} messages.
         * @param message RepairProperties message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: botCraft.IRepairProperties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RepairProperties message, length delimited. Does not implicitly {@link botCraft.RepairProperties.verify|verify} messages.
         * @param message RepairProperties message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: botCraft.IRepairProperties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RepairProperties message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RepairProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): botCraft.RepairProperties;

        /**
         * Decodes a RepairProperties message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RepairProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): botCraft.RepairProperties;

        /**
         * Verifies a RepairProperties message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RepairProperties message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RepairProperties
         */
        public static fromObject(object: { [k: string]: any }): botCraft.RepairProperties;

        /**
         * Creates a plain object from a RepairProperties message. Also converts values to other types if specified.
         * @param message RepairProperties
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: botCraft.RepairProperties, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RepairProperties to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a State. */
    interface IState {

        /** State entities */
        entities?: (botCraft.IEntity[]|null);

        /** State players */
        players?: (botCraft.IPlayer[]|null);

        /** State nextId */
        nextId?: (number|null);

        /** State tick */
        tick?: (number|null);
    }

    /** Represents a State. */
    class State implements IState {

        /**
         * Constructs a new State.
         * @param [properties] Properties to set
         */
        constructor(properties?: botCraft.IState);

        /** State entities. */
        public entities: botCraft.IEntity[];

        /** State players. */
        public players: botCraft.IPlayer[];

        /** State nextId. */
        public nextId: number;

        /** State tick. */
        public tick: number;

        /**
         * Creates a new State instance using the specified properties.
         * @param [properties] Properties to set
         * @returns State instance
         */
        public static create(properties?: botCraft.IState): botCraft.State;

        /**
         * Encodes the specified State message. Does not implicitly {@link botCraft.State.verify|verify} messages.
         * @param message State message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: botCraft.IState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified State message, length delimited. Does not implicitly {@link botCraft.State.verify|verify} messages.
         * @param message State message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: botCraft.IState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a State message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns State
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): botCraft.State;

        /**
         * Decodes a State message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns State
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): botCraft.State;

        /**
         * Verifies a State message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a State message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns State
         */
        public static fromObject(object: { [k: string]: any }): botCraft.State;

        /**
         * Creates a plain object from a State message. Also converts values to other types if specified.
         * @param message State
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: botCraft.State, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this State to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Player. */
    interface IPlayer {

        /** Player id */
        id?: (number|null);

        /** Player score */
        score?: (number|null);
    }

    /** Represents a Player. */
    class Player implements IPlayer {

        /**
         * Constructs a new Player.
         * @param [properties] Properties to set
         */
        constructor(properties?: botCraft.IPlayer);

        /** Player id. */
        public id: number;

        /** Player score. */
        public score: number;

        /**
         * Creates a new Player instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Player instance
         */
        public static create(properties?: botCraft.IPlayer): botCraft.Player;

        /**
         * Encodes the specified Player message. Does not implicitly {@link botCraft.Player.verify|verify} messages.
         * @param message Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: botCraft.IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Player message, length delimited. Does not implicitly {@link botCraft.Player.verify|verify} messages.
         * @param message Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: botCraft.IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): botCraft.Player;

        /**
         * Decodes a Player message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): botCraft.Player;

        /**
         * Verifies a Player message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Player message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Player
         */
        public static fromObject(object: { [k: string]: any }): botCraft.Player;

        /**
         * Creates a plain object from a Player message. Also converts values to other types if specified.
         * @param message Player
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: botCraft.Player, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Player to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Point2D. */
    interface IPoint2D {

        /** Point2D x */
        x?: (number|null);

        /** Point2D y */
        y?: (number|null);
    }

    /** Represents a Point2D. */
    class Point2D implements IPoint2D {

        /**
         * Constructs a new Point2D.
         * @param [properties] Properties to set
         */
        constructor(properties?: botCraft.IPoint2D);

        /** Point2D x. */
        public x: number;

        /** Point2D y. */
        public y: number;

        /**
         * Creates a new Point2D instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Point2D instance
         */
        public static create(properties?: botCraft.IPoint2D): botCraft.Point2D;

        /**
         * Encodes the specified Point2D message. Does not implicitly {@link botCraft.Point2D.verify|verify} messages.
         * @param message Point2D message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: botCraft.IPoint2D, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Point2D message, length delimited. Does not implicitly {@link botCraft.Point2D.verify|verify} messages.
         * @param message Point2D message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: botCraft.IPoint2D, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Point2D message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Point2D
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): botCraft.Point2D;

        /**
         * Decodes a Point2D message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Point2D
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): botCraft.Point2D;

        /**
         * Verifies a Point2D message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Point2D message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Point2D
         */
        public static fromObject(object: { [k: string]: any }): botCraft.Point2D;

        /**
         * Creates a plain object from a Point2D message. Also converts values to other types if specified.
         * @param message Point2D
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: botCraft.Point2D, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Point2D to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Entity. */
    interface IEntity {

        /** Entity id */
        id?: (number|null);

        /** Entity playerId */
        playerId?: (number|null);

        /** Entity entityType */
        entityType?: (botCraft.EntityType|null);

        /** Entity health */
        health?: (number|null);

        /** Entity position */
        position?: (botCraft.IPoint2D|null);

        /** Entity active */
        active?: (boolean|null);
    }

    /** Represents an Entity. */
    class Entity implements IEntity {

        /**
         * Constructs a new Entity.
         * @param [properties] Properties to set
         */
        constructor(properties?: botCraft.IEntity);

        /** Entity id. */
        public id: number;

        /** Entity playerId. */
        public playerId: number;

        /** Entity entityType. */
        public entityType: botCraft.EntityType;

        /** Entity health. */
        public health: number;

        /** Entity position. */
        public position?: (botCraft.IPoint2D|null);

        /** Entity active. */
        public active: boolean;

        /**
         * Creates a new Entity instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Entity instance
         */
        public static create(properties?: botCraft.IEntity): botCraft.Entity;

        /**
         * Encodes the specified Entity message. Does not implicitly {@link botCraft.Entity.verify|verify} messages.
         * @param message Entity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: botCraft.IEntity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Entity message, length delimited. Does not implicitly {@link botCraft.Entity.verify|verify} messages.
         * @param message Entity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: botCraft.IEntity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Entity message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Entity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): botCraft.Entity;

        /**
         * Decodes an Entity message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Entity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): botCraft.Entity;

        /**
         * Verifies an Entity message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Entity message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Entity
         */
        public static fromObject(object: { [k: string]: any }): botCraft.Entity;

        /**
         * Creates a plain object from an Entity message. Also converts values to other types if specified.
         * @param message Entity
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: botCraft.Entity, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Entity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
