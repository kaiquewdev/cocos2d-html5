/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * Base class for Easing actions
 * @class
 * @extends cc.ActionInterval
 */

cc.ActionEase = cc.ActionInterval.extend(/** @lends cc.ActionEase# */{

    /** initializes the action
     * @param {cc.ActionInterval} action
     * @return {Boolean}
     */
    initWithAction:function (action) {
        cc.Assert(action != null, "");

        if (this.initWithDuration(action.getDuration())) {
            this._other = action;
            return true;
        }
        return false;
    },
    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    },

    /**
     * @param {cc.Node} target
     */
    startWithTarget:function (target) {
        this._super(target);
        this._other.startWithTarget(this._target);   //TODO, need to be checked
    },

    /**
     * Stop the action.
     */
    stop:function () {
        this._other.stop();
        this._super();
    },

    /**
     * @param {Number} time1
     */
    update:function (time1) {
        this._other.update(time1);

    },

    /**
     * @return {cc.ActionInterval}
     */
    reverse:function () {
        return cc.ActionEase.create(this._other.reverse());
    },

    _other:null
});

/** creates the action of ActionEase
 * @param {cc.ActionInterval} action
 * @return {cc.ActionEase}
 * @example
 * // example
 * var moveEase = cc.ActionEase.create(action);
 */
cc.ActionEase.create = function (action) {
    var ret = new cc.ActionEase();
    if (ret) {
        ret.initWithAction(action);

    }
    return ret;
};

/**
 * Base class for Easing actions with rate parameters
 * @class
 * @extends cc.ActionEase
 */
cc.EaseRateAction = cc.ActionEase.extend(/** @lends cc.EaseRateAction# */{

    /** set rate value for the actions
     * @param {Number} rate
     */
    setRate:function (rate) {
        this._rate = rate;
    },

    /** get rate value for the actions
     * @return {Number}
     */
    getRate:function () {
        return this._rate;
    },

    /** Initializes the action with the inner action and the rate parameter
     *
     * @param {cc.ActionInterval} action
     * @param {Number} rate
     * @return {Boolean}
     */
    initWithAction:function (action, rate) {
        if (this._super(action)) {
            this._rate = rate;
            return true;
        }

        return false;
    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    },

    /**
     * @return {cc.ActionInterval}
     */
    reverse:function () {
        return cc.EaseRateAction.create(this._other.reverse(), 1 / this._rate);
    },

    _rate:null
});

/** Creates the action with the inner action and the rate parameter
 * @param {cc.ActionInterval} action
 * @param {Number} rate
 * @return {cc.EaseRateAction}
 * @example
 * // example
 * var moveEaseRateAction = cc.EaseRateAction.create(action, 3.0);
 */
cc.EaseRateAction.create = function (action, rate) {
    var ret = new cc.EaseRateAction();
    if (ret) {
        ret.initWithAction(action, rate);

    }
    return ret;

};

/**
 * cc.EaseIn action with a rate
 * @class
 * @extends cc.EaseRateAction
 */
cc.EaseIn = cc.EaseRateAction.extend(/** @lends cc.EaseIn# */{

    /**
     * @param {Number} time1
     */
    update:function (time1) {
        this._other.update(Math.pow(time1, this._rate));
    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }

});

/** Creates the action with the inner action and the rate parameter
 * @param {cc.ActionInterval} action
 * @param {Number} rate
 * @return {cc.EaseIn}
 * @example
 * // example
 * var moveEaseIn = cc.EaseIn.create(action, 3.0);
 */
cc.EaseIn.create = function (action, rate) {
    var ret = new cc.EaseIn();
    if (ret) {
        ret.initWithAction(action, rate);

    }
    return ret;
};
/**
 * cc.EaseOut action with a rate
 * @class
 * @extends cc.EaseRateAction
 */
cc.EaseOut = cc.EaseRateAction.extend(/** @lends cc.EaseOut# */{

    /**
     * @param {Number} time1
     */
    update:function (time1) {
        this._other.update(Math.pow(time1, 1 / this._rate));
    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }


});

/** Creates the action with the inner action and the rate parameter
 * @param {cc.ActionInterval} action
 * @param {Number} rate
 * @return {cc.EaseOut}
 * @example
 * // example
 * var moveEaseOut = cc.EaseOut.create(action, 3.0);
 */
cc.EaseOut.create = function (action, rate) {
    var ret = new cc.EaseOut();
    if (ret) {
        ret.initWithAction(action, rate);

    }
    return ret;
};

/**
 * cc.EaseInOut action with a rate
 * @class
 * @extends cc.EaseRateAction
 */
cc.EaseInOut = cc.EaseRateAction.extend(/** @lends cc.EaseInOut# */{

    /**
     * @param {Number} time1
     */
    update:function (time1) {

        var sign = 1;
        var r = this._rate;

        if (r % 2 == 0) {
            sign = -1;
        }

        time1 *= 2;
        if (time1 < 1) {
            this._other.update(0.5 * Math.pow(time1, this._rate));
        } else {
            this._other.update(sign * 0.5 * (Math.pow(time1 - 2, this._rate) + sign * 2));
        }

    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    },

    /**
     * @return {cc.ActionInterval}
     */
    reverse:function () {
        return cc.EaseInOut.create(this._other.reverse(), this._rate);

    }


});

/** Creates the action with the inner action and the rate parameter
 * @param {cc.ActionInterval} action
 * @param {Number} rate
 * @return {cc.EaseInOut}
 * @example
 * // example
 * var moveEaseInOut = cc.EaseInOut.create(action, 3.0);
 */
cc.EaseInOut.create = function (action, rate) {
    var ret = new cc.EaseInOut();
    if (ret) {
        ret.initWithAction(action, rate);

    }
    return ret;
};
/**
 * cc.Ease Exponential In
 * @class
 * @extends cc.ActionEase
 */
cc.EaseExponentialIn = cc.ActionEase.extend(/** @lends cc.EaseExponentialIn# */{

    /**
     * @param {Number} time1
     */
    update:function (time1) {
        this._other.update(time1 == 0 ? 0 : Math.pow(2, 10 * (time1 / 1 - 1)) - 1 * 0.001);

    },

    /**
     * @return {cc.ActionInterval}
     */
    reverse:function () {
        return cc.EaseExponentialOut.create(this._other.reverse());
    },
    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }


});

/** creates the action
 * @param {cc.ActionInterval} action
 * @return {cc.EaseExponentialIn}
 * @example
 * // example
 * var moveEaseExponentialIn = cc.EaseExponentialIn.create(action);
 */
cc.EaseExponentialIn.create = function (action) {
    var ret = new cc.EaseExponentialIn();
    if (ret) {
        ret.initWithAction(action);

    }
    return ret;
};
/**
 * Ease Exponential Out
 * @class
 * @extends cc.ActionEase
 */
cc.EaseExponentialOut = cc.ActionEase.extend(/** @lends cc.EaseExponentialOut# */{

    /**
     * @param {Number} time1
     */
    update:function (time1) {
        this._other.update(time1 == 1 ? 1 : (-(Math.pow(2, -10 * time1 / 1)) + 1));
    },

    /**
     * @return {cc.ActionInterval}
     */
    reverse:function () {
        return cc.EaseExponentialIn.create(this._other.reverse());
    },
    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }



});

/** creates the action
 * @param {cc.ActionInterval} action
 * @return {cc.EaseExponentialOut}
 * @example
 * // example
 * var moveEaseExponentialOut = cc.EaseExponentialOut.create(action);
 */
cc.EaseExponentialOut.create = function (action) {
    var ret = new cc.EaseExponentialOut();
    if (ret) {
        ret.initWithAction(action);

    }
    return ret;
};
/**
 * Ease Exponential InOut
 * @class
 * @extends cc.ActionEase
 */
cc.EaseExponentialInOut = cc.ActionEase.extend(/** @lends cc.EaseExponentialInOut# */{

    /**
     * @param {Number} time1
     */
    update:function (time1) {
        time1 /= 0.5;
        if (time1 < 1) {
            time1 = 0.5 * Math.pow(2, 10 * (time1 - 1));
        } else {
            time1 = 0.5 * (-Math.pow(2, 10 * (time1 - 1)) + 2);
        }

        this._other.update(time1);

    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }

});


/** creates the action
 * @param {cc.ActionInterval} action
 * @return {cc.EaseExponentialInOut}
 * @example
 * // example
 * var moveEaseExponentialInOut = cc.EaseExponentialInOut.create(action);
 */
cc.EaseExponentialInOut.create = function (action) {
    var ret = new cc.EaseExponentialInOut();
    if (ret) {
        ret.initWithAction(action);

    }
    return ret;
};


/**
 * Ease Sine In
 * @class
 * @extends cc.ActionEase
 */
cc.EaseSineIn = cc.ActionEase.extend(/** @lends cc.EaseSineIn# */{
    /**
     * @param {Number} time1
     */
    update:function (time1) {
        this._other.update(-1 * Math.cos(time1 * Math.PI / 2) + 1);
    },

    /**
     * @return {cc.ActionInterval}
     */
    reverse:function () {
        return cc.EaseSineOut.create(this._other.reverse());
    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }
});

/** creates the action
 * @param {cc.ActionInterval} action
 * @return {cc.EaseSineIn}
 * @example
 * // example
 * var moveSineIn = cc.EaseSineIn.create(action);
 */
cc.EaseSineIn.create = function (action) {
    var ret = new cc.EaseSineIn();
    if (ret) {
        ret.initWithAction(action);

    }
    return ret;
};
/**
 * Ease Sine Out
 * @class
 * @extends cc.ActionEase
 */
cc.EaseSineOut = cc.ActionEase.extend({
    /**
     * @param {Number} time1
     */
    update:function (time1) {
        this._other.update(Math.sin(time1 * Math.PI / 2));
    },

    /**
     * @return {cc.ActionInterval}
     */
    reverse:function () {
        return cc.EaseSineIn.create(this._other.reverse());
    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }
});


/** creates the action
 * @param {cc.ActionInterval} action
 * @return {cc.EaseSineOut}
 * @example
 * // example
 * var moveEaseOut = cc.EaseSineOut.create(action);
 */
cc.EaseSineOut.create = function (action) {
    var ret = new cc.EaseSineOut();
    if (ret) {
        ret.initWithAction(action);

    }
    return ret;
};


/**
 * Ease Sine InOut
 * @class
 * @extends cc.ActionEase
 */
cc.EaseSineInOut = cc.ActionEase.extend(/** @lends cc.EaseSineInOut# */{

    /**
     * @param {Number} time1
     */
    update:function (time1) {
        this._other.update(-0.5 * (Math.cos(Math.PI * time1) - 1));

    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }

});

/** creates the action
 * @param {cc.ActionInterval} action
 * @return {cc.EaseSineInOut}
 * @example
 * // example
 * var moveEaseSineInOut = cc.EaseSineInOut.create(action);
 */
cc.EaseSineInOut.create = function (action) {
    var ret = new cc.EaseSineInOut();
    if (ret) {
        ret.initWithAction(action);

    }
    return ret;
};

/**
 * Ease Elastic abstract class
 * @class
 * @extends cc.ActionEase
 */
cc.EaseElastic = cc.ActionEase.extend(/** @lends cc.EaseElastic# */{

    /** get period of the wave in radians. default is 0.3
     * @return {Number}
     */
    getPeriod:function () {
        return this._period;
    },

    /** set period of the wave in radians.
     * @param {Number} period
     */
    setPeriod:function (period) {
        this._period = period;
    },

    /** Initializes the action with the inner action and the period in radians (default is 0.3)
     * @param {cc.ActionInterval} action
     * @param {Number} period
     * @return {Boolean}
     */
    initWithAction:function (action, period) {
        this._super(action);
        this._period = (period == null) ? 3.0 : period;
        return true;
    },

    /**
     * @return {Null}
     */
    reverse:function () {
        cc.Assert(0, "");

        return null;
    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    },

    _period:null
});

/** Creates the action with the inner action and the period in radians (default is 0.3)
 * @param {cc.ActionInterval} action
 * @param {Number} period
 * @return {cc.EaseElastic}
 * @example
 * // example
 * var moveEaseElastic = cc.EaseElastic.create(action, 3.0);
 */
cc.EaseElastic.create = function (action, period) {
    var ret = new cc.EaseElastic();
    if (ret) {
        if (period == null) {
            ret.initWithAction(action);
        } else {
            ret.initWithAction(action, period);
        }

    }
    return ret;
};


/**
 * Ease Elastic In action.
 * @warning This action doesn't use a bijective fucntion. Actions like Sequence might have an unexpected result when used with this action.
 * @class
 * @extends cc.EaseElastic
 */
cc.EaseElasticIn = cc.EaseElastic.extend(/** @lends cc.EaseElasticIn# */{
    /**
     * @param {Number} time1
     */
    update:function (time1) {
        var newT = 0;
        if (time1 == 0 || time1 == 1) {
            newT = time1;
        } else {
            var s = this._period / 4;
            time1 = time1 - 1;
            newT = -Math.pow(2, 10 * time1) * Math.sin((time1 - s) * Math.PI * 2 / this._period);
        }

        this._other.update(newT);
    },

    /**
     * @return {cc.ActionInterval}
     */
    reverse:function () {
        return cc.EaseElasticOut.create(this._other.reverse(), this._period);
    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }


});


/** Creates the action with the inner action and the period in radians (default is 0.3)
 * @param {cc.ActionInterval} action
 * @param {Number} period
 * @return {cc.EaseElasticIn}
 * @example
 * // example
 * var moveEaseElasticIn = cc.EaseElasticIn.create(action, 3.0);
 */
cc.EaseElasticIn.create = function (action, period) {
    var ret = new cc.EaseElasticIn();
    if (ret) {
        if (period == null) {
            ret.initWithAction(action);
        } else {
            ret.initWithAction(action, period);
        }

    }
    return ret;
};

/**
 * Ease Elastic Out action.
 * @warning This action doesn't use a bijective fucntion. Actions like Sequence might have an unexpected result when used with this action.
 * @class
 * @extends cc.EaseElastic
 */
cc.EaseElasticOut = cc.EaseElastic.extend(/** @lends cc.EaseElasticOut# */{
    /**
     * @param {Number} time1
     */
    update:function (time1) {
        var newT = 0;
        if (time1 == 0 || time1 == 1) {
            newT = time1;
        } else {
            var s = this._period / 4;
            newT = Math.pow(2, -10 * time1) * Math.sin((time1 - s) * Math.PI * 2 / this._period) + 1;
        }

        this._other.update(newT);

    },

    /**
     * @return {cc.ActionInterval}
     */
    reverse:function () {
        return cc.EaseElasticIn.create(this._other.reverse(), this._period);
    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }


});


/** Creates the action with the inner action and the period in radians (default is 0.3)
 * @param {cc.ActionInterval} action
 * @param {Number} period
 * @return {cc.EaseElasticOut}
 * @example
 * // example
 * var moveEaseElasticOut = cc.EaseElasticOut.create(action, 3.0);
 */
cc.EaseElasticOut.create = function (action, period) {
    var ret = new cc.EaseElasticOut();
    if (ret) {
        if (period == null) {
            ret.initWithAction(action);
        } else {
            ret.initWithAction(action, period);
        }

    }
    return ret;
};

/**
 * Ease Elastic InOut action.
 * @warning This action doesn't use a bijective fucntion. Actions like Sequence might have an unexpected result when used with this action.
 * @class
 * @extends cc.EaseElastic
 */
cc.EaseElasticInOut = cc.EaseElastic.extend(/** @lends cc.EaseElasticInOut# */{
    /**
     * @param {Number} time1
     */
    update:function (time1) {
        var newT = 0;
        if (time1 == 0 || time1 == 1) {
            newT = time1;
        } else {
            time1 = time1 * 2;
            if (!this._period) {
                this._period = 0.3 * 1.5;
            }

            var s = this._period / 4;

            time1 = time1 - 1;
            if (time1 < 0) {
                newT = -0.5 * Math.pow(2, 10 * time1) * Math.sin((time1 - s) * Math.PI * 2 / this._period);
            } else {
                newT = Math.pow(2, -10 * time1) * Math.sin((time1 - s) * Math.PI * 2 / this._period) * 0.5 + 1;
            }
        }

        this._other.update(newT);

    },

    /**
     * @return {cc.ActionInterval}
     */
    reverse:function () {
        return cc.EaseInOut.create(this._other.reverse(), this._period);
    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }

});

/** Creates the action with the inner action and the period in radians (default is 0.3)
 * @param {cc.ActionInterval} action
 * @param {Number} period
 * @return {cc.EaseElasticInOut}
 * @example
 * // example
 * var moveEaseElasticInOut = cc.EaseElasticInOut.create(action, 3.0);
 */
cc.EaseElasticInOut.create = function (action, period) {
    var ret = new cc.EaseElasticInOut();
    if (ret) {
        if (period == null) {
            ret.initWithAction(action);
        } else {
            ret.initWithAction(action, period);
        }

    }
    return ret;
};

/**
 * cc.EaseBounce abstract class.
 * @class
 * @extends cc.ActionEase
 */
cc.EaseBounce = cc.ActionEase.extend(/** @lends cc.EaseBounce# */{
    /**
     * @param {Number} time1
     * @return {Number}
     */
    bounceTime:function (time1) {
        if (time1 < 1 / 2.75) {
            return 7.5625 * time1 * time1;
        } else if (time1 < 2 / 2.75) {
            time1 -= 1.5 / 2.75;
            return 7.5625 * time1 * time1 + 0.75;
        } else if (time1 < 2.5 / 2.75) {
            time1 -= 2.25 / 2.75;
            return 7.5625 * time1 * time1 + 0.9375;
        }

        time1 -= 2.625 / 2.75;
        return 7.5625 * time1 * time1 + 0.984375;
    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }


});

/** creates the action
 * @param {cc.ActionInterval} action
 * @return {cc.EaseBounce}
 * @example
 * // example
 * var moveEaseBounce = cc.EaseBounce.create(action);
 */
cc.EaseBounce.create = function (action) {
    var ret = new cc.EaseBounce();
    if (ret) {
        ret.initWithAction(action);
    }
    return ret;
};

/**
 * cc.EaseBounceIn action.
 * @warning This action doesn't use a bijective function. Actions like Sequence might have an unexpected result when used with this action.
 * @class
 * @extends cc.EaseBounce
 */
cc.EaseBounceIn = cc.EaseBounce.extend(/** cc.EaseBounceIn# */{
    /**
     * @param {Number} time1
     */
    update:function (time1) {
        var newT = 1 - this.bounceTime(1 - time1);
        this._other.update(newT);
    },

    /**
     * @return {cc.ActionInterval}
     */
    reverse:function () {
        return cc.EaseBounceOut.create(this._other.reverse());
    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }


});

/** creates the action
 * @param {cc.ActionInterval} action
 * @return {cc.EaseBounceIn}
 * @example
 * // example
 * var moveEaseBounceIn = cc.EaseBounceIn.create(action);
 */
cc.EaseBounceIn.create = function (action) {
    var ret = new cc.EaseBounceIn();
    if (ret) {
        ret.initWithAction(action);
    }
    return ret;
};
/**
 * cc.EaseBounceOut action.
 * @warning This action doesn't use a bijective fucntion. Actions like Sequence might have an unexpected result when used with this action.
 * @class
 * @extends cc.EaseBounce
 */
cc.EaseBounceOut = cc.EaseBounce.extend(/** @lends cc.EaseBounceOut# */{

    /**
     * @param {Number} time1
     */
    update:function (time1) {
        var newT = this.bounceTime(time1);
        this._other.update(newT);
    },

    /**
     * @return {cc.ActionInterval}
     */
    reverse:function () {
        return cc.EaseBounceIn.create(this._other.reverse());
    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }


});

/** creates the action
 * @param {cc.ActionInterval} action
 * @return {cc.EaseBounceOut}
 * @example
 * // example
 * var moveEaseBounceOut = cc.EaseBounceOut.create(action);
 */
cc.EaseBounceOut.create = function (action) {
    var ret = new cc.EaseBounceOut();
    if (ret) {
        ret.initWithAction(action);
    }
    return ret;
};

/**
 * cc.EaseBounceInOut action.
 * @warning This action doesn't use a bijective fucntion. Actions like Sequence might have an unexpected result when used with this action.
 * @class
 * @extends cc.EaseBounce
 */
cc.EaseBounceInOut = cc.EaseBounce.extend(/** @lends cc.EaseBounceInOut# */{

    /**
     * @param {Number} time1
     */
    update:function (time1) {
        var newT = 0;
        if (time1 < 0.5) {
            time1 = time1 * 2;
            newT = (1 - this.bounceTime(1 - time1)) * 0.5;
        } else {
            newT = this.bounceTime(time1 * 2 - 1) * 0.5 + 0.5;
        }

        this._other.update(newT);

    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }

});

/** creates the action
 * @param {cc.ActionInterval} action
 * @return {cc.EaseBounceInOut}
 * @example
 * // example
 * var moveEaseBounceInOut = cc.EaseBounceInOut.create(action);
 */
cc.EaseBounceInOut.create = function (action) {
    var ret = new cc.EaseBounceInOut();
    if (ret) {
        ret.initWithAction(action);
    }
    return ret;
};

/**
 * cc.EaseBackIn action.
 * @warning This action doesn't use a bijective fucntion. Actions like Sequence might have an unexpected result when used with this action.
 * @class
 * @extends cc.ActionEase
 */
cc.EaseBackIn = cc.ActionEase.extend(/** @lends cc.EaseBackIn# */{

    /**
     * @param {Number} time1
     */
    update:function (time1) {
        var overshoot = 1.70158;
        this._other.update(time1 * time1 * ((overshoot + 1) * time1 - overshoot));

    },

    /**
     * @return {cc.ActionInterval}
     */
    reverse:function () {
        return cc.EaseBackOut.create(this._other.reverse());

    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }

});


/** creates the action
 * @param {cc.ActionInterval} action
 * @return {cc.EaseBackIn}
 * @example
 * // example
 * var moveEaseBackIn = cc.EaseBackIn.create(action);
 */
cc.EaseBackIn.create = function (action) {
    var ret = new cc.EaseBackIn();
    if (ret) {
        ret.initWithAction(action);
    }
    return ret;
};

/**
 * cc.EaseBackOut action.
 * @warning This action doesn't use a bijective fucntion. Actions like Sequence might have an unexpected result when used with this action.
 * @class
 * @extends cc.ActionEase
 */
cc.EaseBackOut = cc.ActionEase.extend(/** @lends cc.EaseBackOut# */{
    /**
     * @param {Number} time1
     */
    update:function (time1) {
        var overshoot = 1.70158;

        time1 = time1 - 1;
        this._other.update(time1 * time1 * ((overshoot + 1) * time1 + overshoot) + 1);
    },

    /**
     * @return {cc.ActionInterval}
     */
    reverse:function () {
        return cc.EaseBackIn.create(this._other.reverse());
    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }
});

/** creates the action
 * @param {cc.ActionInterval} action
 * @return {cc.EaseBackOut}
 * @example
 * // example
 * var moveEaseBackOut = cc.EaseBackOut.create(action);
 */
cc.EaseBackOut.create = function (action) {
    var ret = new cc.EaseBackOut();
    if (ret) {
        ret.initWithAction(action);
    }
    return ret;
};

/**
 * cc.EaseBackInOut action.
 * @warning This action doesn't use a bijective fucntion. Actions like Sequence might have an unexpected result when used with this action.
 * @class
 * @extends cc.ActionEase
 */
cc.EaseBackInOut = cc.ActionEase.extend(/** @lends cc.EaseBackInOut# */{
    /**
     * @param {Number} time1
     */
    update:function (time1) {
        var overshoot = 1.70158 * 1.525;

        time1 = time1 * 2;
        if (time1 < 1) {
            this._other.update((time1 * time1 * ((overshoot + 1) * time1 - overshoot)) / 2);
        } else {
            time1 = time1 - 2;
            this._other.update((time1 * time1 * ((overshoot + 1) * time1 + overshoot)) / 2 + 1);
        }
    },

    /**
     * @deprecated It is not needed anymore.
     * @param zone
     */
    copyWithZone:function (zone) {

    }

});


/** creates the action
 * @param {cc.ActionInterval} action
 * @return {cc.EaseBackInOut}
 * @example
 * // example
 * var moveEaseBackInOut = cc.EaseBackInOut.create(action);
 */
cc.EaseBackInOut.create = function (action) {
    var ret = new cc.EaseBackInOut();
    if (ret) {
        ret.initWithAction(action);
    }
    return ret;
};

