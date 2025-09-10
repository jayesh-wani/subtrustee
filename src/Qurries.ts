import { gql } from "@apollo/client";

export const LOG_IN_TRUSTEE = gql`
  mutation SubTrusteeLogin($email: String!, $password: String!) {
    subTrusteeLogin(email: $email, password: $password) {
      token
    }
  }
`;

export const GET_USER = gql`
  query GetSubTrusteeQuery {
    getSubTrusteeQuery {
      _id
      name
      email
      phone
      logo
      role
      trustee_id
    }
  }
`;

export const GET_INSTITUTES = gql`
  query GetSubTrusteeSchools(
    $page: Float
    $limit: Float
    $kycStatus: [String!]
    $searchQuery: String
  ) {
    getSubTrusteeSchools(
      page: $page
      limit: $limit
      kycStatus: $kycStatus
      searchQuery: $searchQuery
    ) {
      total_pages
      page
      totalItems
      schools {
        school_name
        school_id
        pg_key
        email
        phone_number
        merchantStatus
        disabled_modes
        updatedAt
        gstIn
        residence_state
      }
    }
  }
`;

export const GET_TRANSACTIONS = gql`
  query GetSubtrusteeTransactionReport(
    $startDate: String
    $endDate: String
    $status: String
    $school_id: String
    $page: String
    $isCustomSearch: Boolean
    $limit: String
    $isQRCode: Boolean
    $searchFilter: String
    $searchParams: String
    $payment_modes: [String!]
    $gateway: [String!]
  ) {
    getSubtrusteeTransactionReport(
      startDate: $startDate
      endDate: $endDate
      status: $status
      school_id: $school_id
      page: $page
      isCustomSearch: $isCustomSearch
      limit: $limit
      isQRCode: $isQRCode
      searchFilter: $searchFilter
      searchParams: $searchParams
      payment_modes: $payment_modes
      gateway: $gateway
    ) {
      total_pages
      current_page
      transactionReport {
        collect_id
        payment_id
        updatedAt
        createdAt
        order_amount
        transaction_amount
        payment_method
        school_name
        school_id
        status
        student_id
        student_name
        student_email
        student_phone
        student_receipt
        bank_reference
        remarks
        details
        isAutoRefund
        isQRPayment
        commission
        custom_order_id
        payment_time
        reason
        gateway
        capture_status
        virtual_account_id
        virtual_account_number
        virtual_account_ifsc
        isVBAPaymentComplete
        utr_number
        settlement_transfer_time
        error_details {
          error_description
          error_reason
          error_source
        }
        vendors_info {
          vendor_id
          percentage
          amount
          name
          edv_vendor_id
        }
      }
    }
  }
`;
