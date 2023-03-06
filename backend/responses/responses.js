function error(res, err) {
    const response = {
        success: false,
        data: null,
        status: err.status,
        message: err.message,
        code: err.statusCode
    }

    res.status(response.code).json(response)
    res.end();
}

function success(res, code, status, message, data, meta) {
    if (isNaN(code)) {
        code = 200;
    }
    if (code < 200 && code > 299) {
        code = 200;
    }

    if (!meta) {
        meta = null;
    }

    const response = {
        success: true,
        data: data,
        status: status,
        message: message,
        code: code,
        meta: meta
    }

    res.status(response.code).json(response)
    res.end();
}

module.exports = {
    error: error,
    success: success
}