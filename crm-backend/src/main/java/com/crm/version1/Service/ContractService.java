package com.crm.version1.Service;

import com.crm.version1.entity.Contract;
import com.crm.version1.repository.ContractRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ContractService {
    private final ContractRepository contractRepository;

    // Lấy danh sách hợp đồng
    public List<Contract> getAllContracts() {
        return contractRepository.findAll();
    }

    // Tìm hợp đồng theo ID
    public Optional<Contract> getContractById(Long id) {
        return contractRepository.findById(id);
    }

    // Lưu hoặc cập nhật hợp đồng
    public Contract saveContract(Contract contract) {
        return contractRepository.save(contract);
    }

    // Tìm danh sách hợp đồng theo ID khách hàng
    public List<Contract> getByCustomerId(Long customerId) {
        return contractRepository.findByCustomerId(customerId);
    }

    // Xóa hợp đồng
    public void deleteContract(Long id) {
        contractRepository.deleteById(id);
    }
}