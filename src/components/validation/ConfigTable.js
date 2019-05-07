/**
 * Created by tonis.kasekamp on 10/9/17.
 */
import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {columnStyle} from '../../reference';
import {jobFlatPropType} from '../../propTypes';
import JsonHolder from './JsonHolder';

/* eslint-disable camelcase */

/* eslint-disable max-len */
class ConfigTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {slicedData: this.props.jobs.slice(0, 10)};
  }


  handlePagination(start, rowsPerPage) {
    this.setState({slicedData: this.props.jobs.slice(start, start + rowsPerPage)});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.jobs.length !== this.props.jobs.length) {
      this.setState({slicedData: this.props.jobs.slice(0, 10)});
    }
  }

  render() {
    const headers =
      ['id', 'Type', 'Encoding', 'Clustering', 'Method', 'Prefix length', 'Label',
        'Padding', 'Generation type', 'Hyperparameter Optimizer', 'Clustering Hyperparameters',
        'Predictive Model Hyperparameters'];
    return (<DataTable baseId="simple-pagination" selectableRows={false}>
      <TableHeader>
        <TableRow>
          {headers.map((header) => <TableColumn key={header} style={columnStyle}> {header}</TableColumn>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {this.state.slicedData.map(
          (job) => (
            <TableRow key={job.id}>
              <TableColumn style={columnStyle}>{job.id}</TableColumn>
              <TableColumn style={columnStyle}>{job.type}</TableColumn>
              <TableColumn style={columnStyle}>{job.encodingMethod}</TableColumn>
              <TableColumn style={columnStyle}>{job.clustering}</TableColumn>
              <TableColumn style={columnStyle}>{job.method}</TableColumn>
              <TableColumn style={columnStyle} numeric>{job.prefix_length}</TableColumn>
              <TableColumn style={columnStyle}><JsonHolder data={job.labelling}/></TableColumn>
              <TableColumn style={columnStyle}>{job.padding.toString()}</TableColumn>
              <TableColumn style={columnStyle}>{job.generationType}</TableColumn>
              <TableColumn style={columnStyle}><JsonHolder data={job.hyperopt}/></TableColumn>
              <TableColumn style={columnStyle}><JsonHolder data={job.clustering_hyperparameters}/></TableColumn>
              <TableColumn style={columnStyle}><JsonHolder data={job.predictive_model_hyperparameters}/></TableColumn>
            </TableRow>
          ))}
      </TableBody>
      <TablePagination rows={this.props.jobs.length} rowsPerPageLabel={'Rows per page'}
                       onPagination={this.handlePagination.bind(this)}/>
    </DataTable>);
  }
}

ConfigTable.propTypes = {
  jobs: PropTypes.arrayOf(jobFlatPropType).isRequired
};

export default ConfigTable;
