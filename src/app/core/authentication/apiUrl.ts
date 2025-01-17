export const apiUrl = {
    adminLogin: 'v1/acl/operator/login',
    forFetchToken:'fetch_operator_token',
    dashboard_stats:'analytics/data_aggregation',
    isLoggedIn: 'v1/acl/operator/isloggedin',
    dashboardGraph:'analytics/data_aggregation',

    // Dashboard ride search urls
    getRidePath:'get_ride_path',
    getEngangementInfo:'schedule-ride-auth/get_engagement_info?',

    // Dashboard Driver search urls
    driverInfo:'schedule-ride-auth/driver_info',
    getCanceledRideIssueTag:'issue_tracker/get_cancelled_rides_issue_tags',
    getDriverSubscription:'get_driver_subscription_txns',
    getUsersCreditLogs:'get_user_credit_logs',
    removeDriver:'remove_wrong_driver',
    // Dashboard Users search urls

    userDetails:'schedule-ride-auth/get/user_details',
    getCancelRideIssue:'issue_tracker/get_cancelled_rides_issue_tags',

    // ride tab urls

    getOngoingRide:'get_ride_details',
    getSchduleRideDetails:'get_scheduled_ride_details',
    fetchVehicle:'fetch_vehicles',
    getCityInfo:'get_city_info_operator_wise',



    // View map api urls

    getUnacceptedRideRequest:'get_unaccepted_ride_details',
    getDriverDetails:'get_driver_details',
    driverStatus:'driver_status',
    getUnacceptedRides:'get_unaccepted_ride_details',

 // Users drivers Customes api urls
    activeDrivers:'active_driver_details',
    getSelfEnrolledDrivers:'v2/get_self_enrolled_drivers',
    driverPayoutInfo:'get_payout_info',
    driverVehcleEnrollment:'fetch_pending_driver_vehicles_for_approval',
    customersDetails:'customer_details',
    addCaptain:'add_driver_from_panel',
    giveUserCredits:'give_user_credits',
    deactivateUserById:'update_can_request',

    managerDetails:'v1/acl/user/details_with_permissions',
    suspendManager:'v1/acl/user/suspend',
    editManager:'v1/acl/user/edit',
    updatePermissions:'v1/acl/permissions/update',
    addManager:'v1/acl/operator/add',
    getPermissions:'get_page_with_permission',
    // Settings
    gernalSettings:'fetch/operator/fields',
    gernalFetchOperatorParameters:'fetch_operator_parameters',
    fileUpload:'internal/upload_img_to_s3',
    updateFeilds:'update/operator/fields',
    updateOperatorParams:'update_operator_params',
    fetchPolygon:'fetch_polygon',
    setPolygon: 'update_polygon',
    getCitySettingFeilds:'fetch/operator/city/fields',
    getCitySettingService:'fetch/operator/city/service',
    deleteBanner:'internal/delete_banner',
    deleteBannerType:'internal/delete_banner_type',
    fetchBanners:'internal/fetch_banners',
    fetchBannerTypes:'internal/fetch_banner_types',
    uploadFile:'internal/upload_logo_to_s3',
    createBannerType:'internal/create_banner_type',
    updateBannertype:'internal/update_banner_type',
    createBanner:'internal/create_banner',
    updateBanner:'internal/update_banner',
    fetchTickets:'internal/fetch_support_tickets',
    updateTicket:'internal/update_support_ticket',
    fetchDocuments:'fetchCityDocuments',
    updateDocument:'update_document',
    addDocument:'insert_document',
    updateCitySettings:'update/operator/city/fields',
    vehicleFareSettings: 'internal/fetch_operator_vehicle_type',
    vehicleList: 'fetch_vehicles',
    allvehicleTypeList: 'fetch_all_vehicles',
    vehicleInformationget:'fetch_vehicle_make',
    vehicleInformationAddVehicle:'add_vehicle_make',
    vehicleInformationUpdateVehicle:'update_vehicle_make',
    insertVehicleFareSettings: 'internal/insert_operator_vehicle_type',
    creditReferral:'credit_referral',
    updateCreditReferral:'update_credit_referral',
    createCreditReferral:'create_credit_referral',
    fetchPromos:'fetch_promos',
    createPromo:'create_auth_promotion',
    editPromo: 'edit_auth_promotion',
    insertCoupon: 'insert_coupon',
    editCoupon: 'edit_coupon',
    getOperatorCityReferral:'get_operator_city_referral',
    updateOperatorCityReferral:'update_operator_city_referral',

    //Push notification
    sendSmsToDriver:'sendSmsToDriver',
    contactCustomers:'contact_customers',
    getCustomers:'get_customers',
    internalFetchVehicleImagesFare:'internal/fetch_vehicle_images_fares',
    update_operator_vehicle_type: 'internal/update_operator_vehicle_type',
    fetch_operator_request_radius:'internal/fetch_operator_request_radius',
    update_vehicle_set:'update_vehicle_set',
    fetch_vehicle_set: 'fetch_vehicle_set',
    update_operator_fares:'internal/update_operator_fares',
    update_operator_request_radius: 'internal/update_operator_request_radius',
    image_upload:'internal/upload_img_to_s3',

    getAllSuspendedDrivers:'get_all_suspended_drivers',
    availableVehicle:'fetch_available_vehicles',

    editDriver:'/edit_driver?',
    documentDetails: '/v2/get_driver_document_details',
    updateDocumentStatus: 'v2/updateDocumentStatus',
};
