import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox, TextField} from 'react-md';
import {CLASSIFICATION, MULTINOMIAL_NAIVE_BAYES} from '../../../reference';

const defaults = {
    'alpha': 1.0,
    'fit_prior': true,
    'incrementalTrains': 3
};

const ClassificationNaiveBayes = (props) => {
    const methodConfig = `${CLASSIFICATION}.${MULTINOMIAL_NAIVE_BAYES}`;

    const alpha = <TextField
        key="alpha"
        id="alpha"
        label="alpha"
        type="number"
        defaultValue={defaults.alpha}
        onChange={props.onChange.bind(this, {methodConfig, key: 'alpha', isNumber: true})}
        min={0}
        className="md-cell md-cell--3"
    />;
    const fitPrior = <Checkbox
        key="fit_prior"
        id="fit_prior"
        name="fit_prior"
        label="fit_prior"
        className="md-cell md-cell--3"
        defaultChecked={defaults.fit_prior}
        onChange={props.onChange.bind(this, {methodConfig, key: 'fit_prior'})}

    />;

    return [
        alpha,
        fitPrior
    ];
};

ClassificationNaiveBayes.propTypes = {
    onChange: PropTypes.func.isRequired
};
export default ClassificationNaiveBayes;
