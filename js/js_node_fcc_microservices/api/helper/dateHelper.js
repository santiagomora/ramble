function month_days( month,year ){
    return new Date(year, month, 0).getDate();
}

function is_valid_day( day,month,year ){
    return day<month_days( month,year );
}

function is_valid_month( month ){
    return month<=12 && month>=1;
}

function validate_date( month,day,year ){
    return is_valid_month( month )
        ? is_valid_day( day,month,year )
        : false;
}

function assemble_date( date_arr ){
    return validate_date( ...date_arr )
        ? date_arr.join('-')
        : null;
}

const process_format = {
    'y-m-d':( [ year,month,day ] ) => assemble_date( [ month,day,year ] ),
    'm-d-y':( [ month,day,year ] ) => assemble_date( [ month,day,year ] ),
    'd-m-y':( [ day,month,year ] ) => assemble_date( [ month,day,year ] ),
    'y-d-m':( [ year,day,month ] ) => assemble_date( [ month,day,year ] ),
}

module.exports = {
    month_days,
    is_valid_day,
    is_valid_month,
    process_format
}
