import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'react-md/lib/SelectFields';
import {
    CLASSIFICATION,
} from '../../reference';
import {selectLabelProptype} from '../../propTypes';
import {modelsToString} from '../../util/dataReducers';

const defaults = {
    'incremental_base_model': null
};

const methodConfig = 'incremental_train';

const Incremental = (props) => {
    const helpText = () => {
        if (props.predictionMethod === CLASSIFICATION) {
            return <div key='key' className="md-cell md-cell--12"><p>
                Incremental learning allows for updating an already trained predictive model with new training
                traces at runtime. The algorithms incrementally update the starting predictive model rather than
                creating a new one from scratch.
            </p>
            </div>;
        } else {
            return <div key='key' className="md-cell md-cell--12"><p>
                Not yet implemented!
            </p>
            </div>;
        }
    };


    const makeModelSelector = (onChange) => {
        const availableModels = [{value: null, label: 'None'}].concat(modelsToString(
            props.classificationModels
            .filter(
                (obj) => (
                    props.classification.includes(obj.config.predictive_model['prediction_method'])
                )
            ))).concat(modelsToString(
            props.regressionModels
            .filter(
                (obj) => (
                    props.regression.includes(obj.config.predictive_model['prediction_method'])
                )
            ))).concat(modelsToString(
            props.timeSeriesPredictionModels
            .filter(
                (obj) => (
                    props.timeSeriesPrediction.includes(obj.config.predictive_model['prediction_method'])
                )
            ))
        );

        return [<SelectField
            key="base_model"
            id="base_model"
            label={'Base model'}
            menuItems={availableModels}
            defaultValue={defaults.incremental_base_model}
            position={SelectField.Positions.TOP_LEFT}
            onChange={onChange.bind(this, {methodConfig, key: 'base_model'})}
            required
        />];
    };

    if (props.predictionMethod === CLASSIFICATION) {
        return [helpText(), ...makeModelSelector(props.onChange,
            props.predictionMethod, props.classificationModels)];
    } else {
        return [helpText()];
    }
};

Incremental.propTypes = {
    baseModel: selectLabelProptype,
    classificationModels: selectLabelProptype,
    regressionModels: selectLabelProptype,
    timeSeriesPredictionModels: selectLabelProptype,
    onChange: PropTypes.func.isRequired
};
export default Incremental;
