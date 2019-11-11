import React, {PureComponent} from 'react';
import {DataTable, TableBody, TableColumn, TableHeader, TablePagination, TableRow} from 'react-md/lib/DataTables/index';
import PropTypes from 'prop-types';
import {tracePropType} from '../../propTypes';

/* eslint-disable camelcase */

/* eslint-disable max-len */
class InterResultTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {slicedData: []};
    }

    handlePagination(start, rowsPerPage) {
        this.setState({slicedData: this.props.traces.slice(start, start + rowsPerPage)});
    }

    compareTraces(prevtraces, traces) {
        if (prevtraces.length !== traces.length) return true;
        for (let i = 0; i < prevtraces.length; i = i + 1) {
            if ((prevtraces[i].last_event !== traces[i].last_event) || (prevtraces[i].completed !== traces[i].completed) ||
                (prevtraces[i].n_events !== traces[i].n_events)) {
                return true;
            }
        }
        return false;
    }

    componentDidUpdate(prevProps) {
        if (this.compareTraces(prevProps.traces, this.props.traces)) {
            this.setState({slicedData: this.props.traces.slice(0, 10)});
        }
    }

    getHeaderColumns() {
        const headers =
            ['Trace Name', 'Intermediate Prediction of Duration', 'Actual Duration', 'Intermediate Prediction of Classification', 'Actual Label'];

        return headers.map((header) => {
                return <TableColumn key={header}> {header}</TableColumn>;
            }
        );
    }

    render() {
        return (<DataTable baseId="simple-pagination" plain>
            <TableHeader>
                <TableRow selectable={false}>
                    {this.getHeaderColumns()}
                </TableRow>
            </TableHeader>
            <TableBody>
                {this.state.slicedData.map(
                    ({id, name, inter_result, finalDiff}) => (
                        <TableRow key={id} selectable={false}>
                            <TableColumn>{name}</TableColumn>
                            <TableColumn>{JSON.stringify(inter_result.duration)}</TableColumn>
                            <TableColumn>{JSON.stringify(finalDiff.diff)}</TableColumn>
                            <TableColumn>{JSON.stringify(inter_result.class_results)}</TableColumn>
                            <TableColumn>{JSON.stringify(finalDiff.class_actual)}</TableColumn>
                        </TableRow>
                    ))}
            </TableBody>
            <TablePagination rows={this.props.traces.length} rowsPerPageLabel={'Rows per page'}
                             onPagination={this.handlePagination.bind(this)}/>
        </DataTable>);
    }
}

InterResultTable.propTypes = {
    traces: PropTypes.arrayOf(tracePropType).isRequired,
    onRequestTraces: PropTypes.func.isRequired,
};

export default InterResultTable;
