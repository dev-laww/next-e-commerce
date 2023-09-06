import PaymentRepository from "@repository/payment.repo";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";

const repositoryMock = mockDeep<PaymentRepository>;

module.exports = {
    __esModule: true,
    default: repositoryMock as unknown as DeepMockProxy<PaymentRepository>
}

